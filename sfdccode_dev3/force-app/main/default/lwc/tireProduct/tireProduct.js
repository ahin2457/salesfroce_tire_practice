import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getProductInfo from '@salesforce/apex/tireProduct.getProductInfo';
import getProducts from '@salesforce/apex/tireProduct.getProducts';
import recentlyViewProduct from '@salesforce/apex/tireProduct.recentlyViewProduct';
import searchProduct from '@salesforce/apex/tireProduct.searchProduct';


const CARTYPE =[
                    {label:'LTR', name:'LTR', carType:'LTR'},
                    {label:'PCR', name:'PCR', carType:'PCR'}                
]
const BRAND =[
                    {label:'AS', name:'AS', brandValue:'AS'},
                    {label:'EU', name:'EU', brandValue:'EU'},
                    {label:'NX', name:'NX', brandValue:'NX'},
                    {label:'RS', name:'RS', brandValue:'RS'},
                    {label:'RT', name:'RT', brandValue:'RT'},
                    {label:'SY', name:'SY', brandValue:'SY'}
]

const TIRETYPE =[
                    {label:'SUV', name:'SUV', tireType:'SUV'},
                    {label:'REG', name:'REG', tireType:'REG'},
                    {label:'COM', name:'COM', tireType:'COM'}

]

const PERFORMANCE =[
                    {label:'HP', name:'HP', types:'HP'},
                    {label:'NONE', name:'NONE', types:'NONE'},
                    {label:'UHP', name:'UHP', types:'UHP'}
    
                
]
const TYPE =[
                    {label:'FERT', name:'FERT', PERFORMANCE:'FERT'},
                    {label:'GHAW', name:'GHAW', PERFORMANCE:'GHAW'}
    
]

const ACTIONS = [
                    {label:'Edit', name:'Edit', key:'edit'}]

    const COLUMN =[ {label:'Product Code', fieldName:'Mertaial__c',       type:'url',     typeAttributes:{label:{fieldName :'NameUrl'}}},
                    {label:'Product Name', fieldName:'productLink',       type:'url',     typeAttributes:{label:{fieldName :'ProductName'}}},
                    {label:'Description',  fieldName:'Description__c',    type:'text'},
                    {label:'Description2', fieldName:'Description2__c',   type:'text'},
                    {label:'Types',        fieldName:'Types__c',          type:'Text'},
                    {label:'Weight',       fieldName:'Net_Weight__c',     type:'Number'},
                    {label:'Division',     fieldName:'Division__c',       type:'Text'},
                    {label:'Car Type',     fieldName:'Car_Type__c',       type:'Text'},
                    {label:'Brand',        fieldName:'Brand__c',          type:'Text'},
                    {label:'Pattern',      fieldName:'Pattern__c',        type:'Text'},
                    {label:'SalesPattern', fieldName:'Sales_Pattern__c',  type:'Text'},
                    {label:'Size',         fieldName:'S_Width__c',        type:'Number'},
                    {label:'Tire Type',    fieldName:'Tire_Type__c',      type:'Text'},
                    {label:'Performance',  fieldName:'Performance__c',    type:'Text'},
                    {label:'Edit',         fieldName: "actions",          type:'action',   typeAttributes:{rowActions: ACTIONS}}
                    ]

export default class TireProduct extends LightningElement {
    cols = COLUMN;
    products;

    @track Description ='';
    @track Description2 ='';
    @track isShowModal = false;

    showModal(){
        this.isShowModal=true;
    }
    closeModal(){
        this.isShowModal=false;
    }
       //connectCallback
       async connectedCallback() { // 비동기
        await this.viewAll();
      }

      //ComboBox Options
    get options() {
        return [
            { label: 'All', value: 'All' },
            { label: 'Recent', value: 'Recent'},
           ];
    }
    handleDescriptionChange(event){
        this.Description = event.target.value;
    }
    handleDescription2Change(event){
        this.Description2 = event.target.value;
    }
    async viewAll(){
    const result = await getProducts();
        this.products = result.map((row)=>{
            return this.mapProducts(row);
        });
    }
    async viewRecent(){
        const result = await recentlyViewProduct();
            this.products = result.map((row)=>{
                return this.mapProducts(row);
            });
    }
    async searchView(){
        const searchProducts = await searchProduct({searchString: event.target.value});
        this.products = searchProducts.map(row =>{
            return this.mapProducts(row);
        });
    }

      // 리스트 필터
      async handleChange(event){
        this.value = event.detail.value;
         if(this.value == 'All'){
            await this.viewAll();
         }
         else if(this.value =='Recent'){
             await this.viewRecent();
         }
     }
     
     
     async handleRowAction(event) {
     const selectKey = event.detail.action.key;
        if(selectKey== 'edit'){
            
        } 
    }

     async handleSearch(event){
        if(!event.target.value) {
            await this.viewAll();
        } else {
            
           await this.searchView();
        }
    }

    mapProducts(row){
        return {...row,
            NameUrl: row.ProductCode,
            ProductName: row.Name,
            ProductCode:`/${row.Id}`,
            productLink:`/${row.Id}`
        };
    }
    // 공사중
    updateRecord(event){
        console.log(event.Id);


    }



}