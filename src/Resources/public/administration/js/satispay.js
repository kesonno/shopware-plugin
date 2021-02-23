(this.webpackJsonp=this.webpackJsonp||[]).push([["satispay"],{"1NDN":function(t,e){t.exports='{% block satispay_payment_actions_modal_refund %}\n\n    <sw-modal\n        variant="small"\n        :title="$tc(`satispay-payments.paymentDetails.modal.refund.title`)"\n        @modal-close="$emit(\'modal-close\')">\n        <sw-number-field\n            :max="refundableAmount"\n            :min="0"\n            v-model="refundAmount"\n            :label="$tc(\'satispay-payments.paymentDetails.modal.refund.amount.label\')"\n            :helpText="$tc(\'satispay-payments.paymentDetails.modal.refund.amount.helpText\')">\n            <template #suffix>\n                {{ paymentResource.currency }}\n            </template>\n        </sw-number-field>\n\n        <template #modal-footer>\n            <sw-button variant="primary"\n                       @click="refund">\n                {{ $tc(\'satispay-payments.paymentDetails.modal.refund.confirmButton\') }}\n            </sw-button>\n        </template>\n\n    </sw-modal>\n{% endblock %}\n'},"312v":function(t,e){t.exports='{% block satispay_payment_actions %}\n<div>\n    <div class="satispay-payment-actions__button-container">\n        <div class="satispay-payment-actions__authorize-button-group">\n\n            {% block satispay_payment_actions_refund %}\n                <sw-button variant="primary"\n                           size="small"\n                           :disabled="notRefundable"\n                           @click="showModal = true">\n                    {{ $tc(\'satispay-payments.paymentDetails.buttons.label.refund\') }}\n                </sw-button>\n            {% endblock %}\n\n        </div>\n\n        {% block satispay_payment_actions_modal %}\n\n            {% block satispay_payment_actions_modal_refund %}\n                <satispay-payment-action-refund\n                    v-if="showModal"\n                    @modal-close="showModal=false"\n                    :order="order" :paymentResource="paymentResource">\n                </satispay-payment-action-refund>\n            {% endblock %}\n\n        {% endblock %}\n    </div>\n</div>\n{% endblock %}\n'},"796N":function(t,e){t.exports='{% block sw_plugin_config_actions_save %}\n     {%  parent %}\n     {% block satispay_plugin_config_actions_activate %}\n         <sw-button v-if="domain === \'Satispay.config\'" class="sw-plugin-config__activate-action"  @click="onActivateClickedButton">\n             {{ $tc(\'satispay-config.activateButton\') }}\n         </sw-button>\n     {% endblock %}\n{% endblock %}\n{% block sw_plugin_config_content %}\n {%  parent %}\n    <sw-loader v-if="isLoading"></sw-loader>\n{% endblock %}\n'},KXz7:function(t,e){const{Component:a,Defaults:n}=Shopware,{Criteria:i}=Shopware.Data;a.register("satispay-config-restriction-saleschannel",{template:" ",inject:["repositoryFactory"],computed:{salesChannelRepository(){return this.repositoryFactory.create("sales_channel")}},created(){this.checkAndHideSetting()},updated(){this.checkAndHideSetting()},methods:{checkAndHideSetting(){const t=this.pluginConfigData().currentSalesChannelId,e=document.querySelectorAll(".sw-block-field");let a=document.querySelector(".sw-system-config--field-satispay-config-sandbox-activated-code");if(a||void 0===e[4]||(a=e[4]),a){const t=a.querySelector("div.sw-inheritance-switch");t&&(t.hidden=!0)}let s=document.querySelector(".sw-system-config--field-satispay-config-live-activated-code");if(s||void 0===e[2]||(s=e[2]),s){const t=s.querySelector("div.sw-inheritance-switch");t&&(t.hidden=!0)}const o=document.querySelectorAll('input[name^="Satispay.config"],.sw-plugin-config__save-action,.sw-plugin-config__activate-action');if(t){const e=new i;e.setPage(1),e.setLimit(500),e.addSorting(i.sort("sales_channel.name","ASC")),e.addFilter(i.equals("typeId",n.storefrontSalesChannelTypeId)),e.addFilter(i.equals("id",t)),this.salesChannelRepository.search(e,Shopware.Context.api,o).then(t=>{t&&0===t.length?o.forEach(t=>{"Satispay.config.liveActivatedCode"!==t.id&&"Satispay.config.sandboxActivatedCode"!==t.id&&t.setAttribute("disabled","disabled")}):o.forEach(t=>{"Satispay.config.liveActivatedCode"!==t.id&&"Satispay.config.sandboxActivatedCode"!==t.id&&t.removeAttribute("disabled")})})}else o.forEach(t=>{"Satispay.config.liveActivatedCode"!==t.id&&"Satispay.config.sandboxActivatedCode"!==t.id&&t.removeAttribute("disabled")});const r=document.querySelectorAll('input[name="Satispay.config.sandbox"]')[0].checked;let c=document.querySelector(".sw-system-config--field-satispay-config-sandbox-activation-code");c||void 0===e[3]||(c=e[3]);let d=document.querySelector(".sw-system-config--field-satispay-config-live-activation-code");d||void 0===e[1]||(d=e[1]),d&&a&&(r?(s.hidden=!0,d.hidden=!0,c.hidden=!1,a.hidden=!1):(a.hidden=!0,c.hidden=!0,d.hidden=!1,s.hidden=!1))},pluginConfigData(){return this.$parent.$parent.$parent.actualConfigData?this.$parent.$parent.$parent:this.$parent.$parent.$parent.$parent}}})},LBEa:function(t){t.exports=JSON.parse('{"satispay-payments":{"general":{"mainMenuItemGeneral":"Satispay Payments","descriptionTextModule":"Satispay Payments"},"paymentDetails":{"title":"Status","buttons":{"label":{"refund":"Make a refund"}},"status":{"heading":"Payment"},"errorPage":{"title":"Error","subline":"There was an error with the fetch of the details"},"description":{"status":"Status","amount":"Amount","currency":"Currency","type":"Type","flow":"Flow"},"modal":{"refund":{"title":"Refund form","amount":{"label":"Amount","helpText":"Amount to refund for the current order"},"confirmButton":"Perform refund"},"notification":{"success":"Refund approved","error":"An error occurred. Please retry or contact your support"}}}},"satispay-config":{"activateButton":"Activate","notification":{"success":"Activation processed","error":"An error occurred. Please retry or contact your support"}}}')},LmsR:function(t,e,a){"use strict";a.r(e);const n=Shopware.Classes.ApiService;var i=class extends n{constructor(t,e,a="satispay"){super(t,e,a)}activate(){const t=`_action/${this.getApiBasePath()}/activate`;return this.httpClient.get(t,{headers:this.getBasicHeaders()}).then(t=>n.handleResponse(t))}};const s=Shopware.Classes.ApiService;var o=class extends s{constructor(t,e,a="satispay"){super(t,e,a)}getPaymentDetails(t,e){const a=`_action/${this.getApiBasePath()}/payment-details/${t}/${e}`;return this.httpClient.get(a,{headers:this.getBasicHeaders()}).then(t=>s.handleResponse(t))}refundPayment(t,e,a){const n=`_action/${this.getApiBasePath()}/refund-payment/${t}/${e}`;return this.httpClient.post(n,{refundAmount:a},{headers:this.getBasicHeaders()}).then(t=>s.handleResponse(t))}};Shopware.Application.addServiceProvider("SatispayConfigApiService",t=>{const e=Shopware.Application.getContainer("init");return new i(e.httpClient,t.loginService)}),Shopware.Application.addServiceProvider("SatispayPaymentService",t=>{const e=Shopware.Application.getContainer("init");return new o(e.httpClient,t.loginService)});var r=a("796N"),c=a.n(r);const{Component:d,Mixin:p}=Shopware;d.override("sw-plugin-config",{template:c.a,inject:["SatispayConfigApiService"],mixins:[p.getByName("notification")],data:()=>({isLoading:!1}),methods:{handleErrorOnApi(t){try{const e=void 0!==t.response.data.error?t.response.data.error:this.$tc("satispay-config.notification.error");this.createNotificationError({title:this.$tc("global.default.error"),message:e,autoClose:!1})}finally{this.isLoading=!1}},handleApiResponse(){try{this.createNotificationSuccess({title:this.$tc("global.default.success"),message:this.$tc("satispay-config.notification.success")})}finally{this.isLoading=!1,window.location.reload()}},onActivateClickedButton(){this.isLoading=!0,this.SatispayConfigApiService.activate().then(this.handleApiResponse).catch(this.handleErrorOnApi)}}});var l=a("Wwaa"),y=a.n(l);const{Component:m,Mixin:u,Context:h}=Shopware,f=Shopware.Data.Criteria;m.register("satispay-payment-detail",{template:y.a,inject:["SatispayPaymentService","repositoryFactory"],mixins:[u.getByName("notification")],data:()=>({isLoading:!0,showPaymentDetails:!1,order:null,satispayTransactionId:null,paymentTransactionData:null,currency:null,status:null,flow:null,type:null}),computed:{showError(){return!1===this.isLoading&&!1===this.showPaymentDetails},amount(){return this.paymentTransactionData?this.paymentTransactionData.amount_unit/100:0}},created(){this.createdComponent()},methods:{handleErrorOnApi(t){try{this.createNotificationError({title:this.$tc("satispay-payments.paymentDetails.errorPage.title"),message:t.response.data.errors[0].detail,autoClose:!1})}finally{this.isLoading=!1,this.showPaymentDetails=!1}},createdComponent(){const t=this.$route.params.id,e=this.repositoryFactory.create("order"),a=new f(1,1);a.getAssociation("transactions").addSorting(f.sort("createdAt")),e.get(t,h.api,a).then(t=>{this.order=t;const e=t.transactions.length-1;if(null===t.transactions[e].customFields||void 0===t.transactions[e].customFields.satispay_payment_id)return this.isLoading=!1,void(this.showPaymentDetails=!1);const a=t.transactions[e].customFields.satispay_payment_id;this.showPaymentDetails=!0,this.SatispayPaymentService.getPaymentDetails(this.order.id,a).then(t=>{this.paymentTransactionData=t,this.status=this.paymentTransactionData.status,this.currency=this.paymentTransactionData.currency,this.flow=this.paymentTransactionData.flow,this.type=this.paymentTransactionData.type,this.isLoading=!1}).catch(this.handleErrorOnApi)}).catch(this.handleErrorOnApi)}}});var g=a("312v"),w=a.n(g),v=a("1NDN"),S=a.n(v);const{Component:b,Mixin:_}=Shopware;b.register("satispay-payment-action-refund",{template:S.a,inject:["SatispayPaymentService"],mixins:[_.getByName("notification")],props:{paymentResource:{type:Object,required:!0},order:{type:Object,required:!0}},data:()=>({refundableAmount:0,refundAmount:0,isLoading:!1}),created(){this.paymentResource&&(this.refundableAmount=this.paymentResource.amount_unit/100)},methods:{handleErrorOnApi(t){try{const e=void 0!==t.response.data.error?t.response.data.error:this.$tc("satispay-payments.paymentDetails.modal.notification.error");this.createNotificationError({title:this.$tc("satispay-payments.paymentDetails.errorPage.title"),message:e,autoClose:!1})}finally{this.isLoading=!1,this.showPaymentDetails=!1,this.$emit("modal-close")}},handleApiResponse(){try{this.createNotificationSuccess({title:this.$tc("global.default.success"),message:this.$tc("satispay-payments.paymentDetails.modal.notification.success")})}finally{this.isLoading=!1,this.showPaymentDetails=!0,this.$emit("modal-close")}},refund(){this.isLoading=!0;const t=this.order.transactions.length-1,e=this.order.transactions[t].customFields.satispay_payment_id,a=0===this.refundAmount?this.refundableAmount:this.refundAmount;this.SatispayPaymentService.refundPayment(this.order.id,e,a).then(this.handleApiResponse).catch(this.handleErrorOnApi)}}});const{Component:A}=Shopware;A.register("satispay-payment-actions",{template:w.a,data:()=>({showModal:!1}),props:{paymentResource:{type:Object,required:!0},order:{type:Object,required:!0}},computed:{notRefundable(){const t=this.order.transactions.length-1,e=this.order.transactions[t].stateMachineState.technicalName,a=["paid","paid_partially","refunded"].indexOf(e)>-1;return this.paymentResource.amount_unit<=0||"ACCEPTED"!=this.paymentResource.status||!a}}});var C=a("LBEa");const{Module:D}=Shopware;D.register("satispay-payment",{type:"plugin",name:"SatispayPayments",title:"satispay-payments.general.mainMenuItemGeneral",description:"satispay-payments.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",color:"#333",icon:"default-action-settings",snippets:{"en-GB":C},routeMiddleware(t,e){"sw.order.detail"===e.name&&e.children.push({component:"satispay-payment-detail",name:"satispay.payment.detail",isChildren:!0,path:"/sw/order/satispay/detail/:id",meta:{parentPath:"sw.order.index"}}),t(e)}});a("KXz7");var $=a("Zc1i"),P=a.n($);const{Component:k,Context:x}=Shopware,R=Shopware.Data.Criteria;k.override("sw-order-detail",{template:P.a,inject:["repositoryFactory"],data:()=>({isSatispayPayment:!1}),created(){this.initializeSatispay()},methods:{initializeSatispay(){const t=this.orderId,e=this.repositoryFactory.create("order"),a=new R(1,1);a.getAssociation("transactions").addSorting(R.sort("createdAt")),e.get(t,x.api,a).then(t=>{const e=t.transactions.length-1;null!==t.transactions[e].customFields&&void 0!==t.transactions[e].customFields.satispay_payment_id?this.isSatispayPayment=!0:this.isSatispayPayment=!1})}}})},Wwaa:function(t,e){t.exports='{% block satispay_payment_detail %}\n    <div class="satispay-payment-detail">\n        <div v-if="!isLoading && showPaymentDetails">\n            <sw-card :title="$tc(\'satispay-payments.paymentDetails.title\')">\n                <template #grid>\n\n                    {% block satispay_payment_actions_section %}\n                        <sw-card-section secondary slim>\n                            <satispay-payment-actions :order="order" :paymentResource="paymentTransactionData">\n                            </satispay-payment-actions>\n                        </sw-card-section>\n                    {% endblock %}\n\n                    <sw-card-section divider="top">\n                        <sw-container columns="1fr"\n                                      gap="0px 30px">\n                            <h3>\n                                  {{ $tc(\'satispay-payments.paymentDetails.status.heading\') }}\n                            </h3>\n\n                            {% block satispay_payment_detail %}\n                                <sw-description-list>\n                                    <dt>{{ $tc(\'satispay-payments.paymentDetails.description.status\') }}</dt>\n                                    <dd>{{ status }}</dd>\n                                    <dt>{{ $tc(\'satispay-payments.paymentDetails.description.amount\') }}</dt>\n                                    <dd>{{ amount }}</dd>\n                                    <dt>{{ $tc(\'satispay-payments.paymentDetails.description.currency\') }}</dt>\n                                    <dd>{{ currency }}</dd>\n                                    <dt>{{ $tc(\'satispay-payments.paymentDetails.description.flow\') }}</dt>\n                                    <dd>{{ flow }}</dd>\n                                    <dt>{{ $tc(\'satispay-payments.paymentDetails.description.type\') }}</dt>\n                                    <dd>{{ type }}</dd>\n                                </sw-description-list>\n                            {% endblock %}\n                        </sw-container>\n                    </sw-card-section>\n                </template>\n            </sw-card>\n\n        </div>\n\n        <div v-if="showError">\n            <sw-empty-state\n                :title="$tc(\'satispay-payments.paymentDetails.errorPage.title\')"\n                :subline="$tc(\'satispay-payments.paymentDetails.errorPage.subline\')"\n                icon="default-shopping-paper-bag"\n                color="#A092F0">\n            </sw-empty-state>\n        </div>\n\n        <sw-loader v-if="isLoading"></sw-loader>\n    </div>\n{% endblock %}\n'},Zc1i:function(t,e){t.exports="{% block sw_order_detail_content_tabs_general %}\n    {% parent %}\n\n    <sw-tabs-item\n        v-if=\"isSatispayPayment\"\n        :route=\"{ name: 'satispay.payment.detail', params: { id: $route.params.id } }\"\n        :title=\"$tc('satispay-payments.order-detail.tabTitle')\">\n        {{ $tc('satispay-payments.order-detail.tabTitle') }}\n    </sw-tabs-item>\n{% endblock %}\n"}},[["LmsR","runtime"]]]);