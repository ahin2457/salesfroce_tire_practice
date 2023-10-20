import { LightningElement, api, track } from 'lwc';
import getProducts from '@salesforce/apex/CustomProduct.getProducts';
import searchProduct from '@salesforce/apex/CustomProduct.searchProduct';
import updateRecordData from '@salesforce/apex/CustomProduct.updateRecordData';
import getProductsInfo from '@salesforce/apex/CustomProduct.getProductsInfo';
import getProductList from '@salesforce/apex/CustomProduct.getProductList';
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent}  from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const ACTIONS = [
    {label:'Edit', name:'Edit', key:'edit'}]

const COLUMN =[ {label:'Product Code', fieldName:'Material__c',       type:'text',     typeAttributes:{label:{fieldName :'NameUrl'}}},
                {label:'Product Name', fieldName:'productLink',       type:'url',     typeAttributes:{label:{fieldName :'ProductName'}}},
                {label:'Desciption',   fieldName:'Desciption__c',     type:'text'},
                {label:'Desciption2',  fieldName:'Desciption2__c',    type:'text'},
                {label:'Types',        fieldName:'Type__c',           type:'Text'},
                {label:'UOM',          fieldName:'Base_UOM__c',       type:'text'},
                {label:'Weight',       fieldName:'Net_Weight__c',     type:'Number'},
                {label:'Weight Unit',  fieldName:'Weight_Unit__c',    type:'text'},
                {label:'Division',     fieldName:'Division__c',       type:'Text'},
                {label:'Car Type',     fieldName:'Car_Type__c',       type:'Text'},
                {label:'Brand',        fieldName:'Brand__c',          type:'Text'},
                {label:'Pattern',      fieldName:'Pattern__c',        type:'Text'},
                {label:'SalesPattern', fieldName:'Sales_Pattern__c',  type:'Text'},
                {label:'S Width',      fieldName:'S_Width__c',        type:'Number'},
                {label:'Tire Type',    fieldName:'Tire_Type__c',      type:'Text'},
                {label:'Performance',  fieldName:'Performance__c',    type:'Text'},
                {label:'Edit',         fieldName: "actions",          type:'action',   typeAttributes:{rowActions: ACTIONS}}
              ]

export default class CustomProduct extends LightningElement {
    @track isShowModal = false;
    @track Desciption = '';
    @track Desciption2 = '';

    
    cols = COLUMN;
    products;
    isDisabled = true; // 수정 버튼 비활성화 여부
    error;
    rowLimit = 20;
    rowOffSet=0;
 
    showModal(){
        this.isShowModal = true;
    }

    closeModal(){
        this.isShowModal = false;
    }

    // select data
   connectedCallback(){
         this.viewAll();
    }

   // select data
   async viewAll(){
        const result = await getProducts();
        this.products = result.map((row)=>{
            return this.mapProducts(row);
        });
   }

   mapProducts(row){
        return {...row,
            NameUrl: row.ProductCode,
            ProductName: row.Name,
            ProductCode: `/${row.Id}`,
            productLink: `/${row.Id}`
        };
   }


   // search view
   async searchView(){
        const searchProducts = await searchProduct({searchString: event.target.value});
        this.products = searchProducts.map(row =>{
            return this.mapProducts(row);
        })
    }

   // search view
   async handleSearch(event){
        if(!event.target.value){
            await this.viewAll();
        } else{
            await this.searchView();
        }
   }

    // edit 필터
    async handleRowAction(event){
        const selectKey = event.detail.action.key;
        if(selectKey == 'edit'){
            console.log(event.detail.row.Id);
            const result = await getProductsInfo({recordId: event.detail.row.Id});
            console.log(result);
            
            this.recordName = result.Name; 
            console.log(this.recordName);

            // this.id 는 reocrd id
            this.id = result.Id;
            console.log(this.id);

            // 나는 html에 보여지는 value 야 value = Desciption 화면에 보여지는 
            this.Desciption  = result.Desciption__c;
            this.Desciption2  = result.Desciption2__c;
            console.log(this.Desciption2);
            
            // fieldName = desciption edit의  저장눌렀을때 실행되는 곳
            this.desciption = result.Desciption__c;
            this.desciption2 = result.Desciption2__c;

            console.log(this.Desciption);

            this.showModal();
        }
    }

    
    handleRecordIdChange(event){
        this.recordName = event.target.value;
    }

    handleDesciptionChange(event){
        this.desciption = event.target.value;
    }

    handleDesciption2Change(event){
        this.desciption2 = event.target.value;
    }

    async updateRecord(){
        console.log(this.id);
        const isUpdate = await updateRecordData({
            // recordId가 this.id(this.id는 모달창을 바라보고있다)고 desciption 은 this.desciption 이다.
            recordId : this.id , desciption : this.desciption, desciption2 : this.desciption2
        });
        
        console.log(isUpdate);
        if(isUpdate){
            this.handleSuccess();
        }else if(!isUpdate){
            this.unMatchedId();
        }

    }


    // 저장 알림
    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Update 되었습니다.',
                variant: 'Success'
            })
        );
        this.closeModal(event);
        this.refresh();
    }

    unMatchedId(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Fail',
                message: '제품담당자가 아닙니다.',
                variant: 'Error'
            })
        );
        this.closeModal(event);
        this.refresh();
    }
    refresh(){
      refreshApex(this.connectedCallback());
    }
    handleClose(){
        window.location.reload();
    }

    
    // pagination
    handlePrevious(event){
            this.dispatchEvent(new CustomEvent('previous'));
    }
        
    handleNext(event){
        this.dispatchEvent(new CustomEvent('next'));
     }

     connectedCallback(){
        this.loadData();
     }

     async loadData(){
        return await getProductList({ limitSize: this.rowLimit , offset : this.rowOffSet })
        .then(result => {
            let updatedRecords = [...this.products, ...result];
            this.products = updatedRecords;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.products = undefined;
        });
    }
  

    loadMoreDataHandler(event) {
        const currentRecord = this.accounts;
        const { target } = event;
        target.isLoading = true;
 
        this.rowOffSet = this.rowOffSet + this.rowLimit;
        this.loadData()
            .then(()=> {
                target.isLoading = false;
            });   
    }


}