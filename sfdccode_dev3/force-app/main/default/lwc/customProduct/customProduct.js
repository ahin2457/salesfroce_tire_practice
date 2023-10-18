import { LightningElement, track } from 'lwc';
import getProducts from '@salesforce/apex/CustomProduct.getProducts';
import searchProduct from '@salesforce/apex/CustomProduct.searchProduct';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from 'sa'


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
    cols = COLUMN;
    products;

    @track isShowModal = false;
    @tarck Desciption = '';
    @tarck Desciption2 = '';

    showModal(){
        this.isShowModal = true;
    }

    closeModal(){
        this.isShowModal = false;
    }

    // select data
    async connectedCallback(){
        await this.viewAll();
        console.log(this.viewAll());
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
            console.log(viewAll());
        } else{
            await this.searchView();
            console.log(this.searchView());
        }
   }

    // edit 필터
    async handleRowAction(event){
        const selectKey = event.detail.action.key;
        if(selectKey == 'edit'){
            
        }
    }

    handleDesciptionChange(event){
        this.Desciption = event.target.value;
    }

    handleDesciption2Change(event){
        this.Desciption2 = event.target.value;
    }

    updateRecord(){

        const field={};
        fields[ID_FIELD]
    }



}