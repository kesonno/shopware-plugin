<?php

declare(strict_types=1);

namespace Satispay\Handler\Api;

use Psr\Log\LoggerInterface;
use Satispay\Exception\SatispayInvalidAuthorizationException;
use Satispay\Exception\SatispayPaymentUnacceptedException;
use Satispay\Helper\PaymentWrapperApi;
use Shopware\Core\Checkout\Payment\Cart\AsyncPaymentTransactionStruct;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class FinalizeTransaction
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var EntityRepositoryInterface
     */
    protected $orderTransactionRepo;

    /**
     * @var PaymentWrapperApi
     */
    protected $paymentWrapperApi;

    public function __construct(
        PaymentWrapperApi $paymentWrapperApi,
        EntityRepositoryInterface $orderTransactionRepo,
        LoggerInterface $logger
    ) {
        $this->logger = $logger;
        $this->orderTransactionRepo = $orderTransactionRepo;
        $this->paymentWrapperApi = $paymentWrapperApi;
    }

    /**
     * @throws SatispayInvalidAuthorizationException
     * @throws SatispayPaymentUnacceptedException
     * @noinspection TypeUnsafeComparisonInspection
     */
    public function execute(AsyncPaymentTransactionStruct $transaction, string $paymentId, SalesChannelContext $salesChannelContext): void
    {
        $this->orderTransactionRepo->update([[
            'id' => $transaction->getOrderTransaction()->getId(),
            'customFields' => [
                PaymentWrapperApi::PAYMENT_ID_IN_TRANSACTION_CUSTOM_FIELD => $paymentId,
            ],
        ]], $salesChannelContext->getContext());

        try {
            $satispayPayment = $this->paymentWrapperApi->getPaymentStatusOnSatispay($salesChannelContext->getSalesChannel()->getId(), $paymentId);
        } catch (\Exception $e) {
            $this->logger->error(
                $e->getMessage(),
                $e->getTrace()
            );

            throw new SatispayInvalidAuthorizationException($e->getMessage());
        }

        if ($satispayPayment->status === PaymentWrapperApi::ACCEPTED_STATUS) {
            $this->logger->debug(
                'Satispay payment accepted',
                [
                    'order_id' => $transaction->getOrder()->getId(),
                    'order_number' => $transaction->getOrder()->getOrderNumber(),
                ]
            );
        } else {
            $this->logger->debug(
                'Satispay payment NOT accepted',
                [
                    'order_id' => $transaction->getOrder()->getId(),
                    'order_number' => $transaction->getOrder()->getOrderNumber(),
                    'satispay_payment' => json_decode(json_encode($satispayPayment), true),
                ]
            );

            throw new SatispayPaymentUnacceptedException(sprintf('Satispay payment status: %s', $satispayPayment->status));
        }
    }
}
