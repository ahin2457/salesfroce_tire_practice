public with sharing class tireProduct {
       
        @AuraEnabled
        public static List<Product2> getProducts(Integer limitSize, Integer offset){
               List<Product2> productList = [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
               FROM Product2 ORDER BY CreatedDate LIMIT :limitSize OFFSET :offset ];

               return productList;
        }

        
        // public class ProductItemWrapper {
        //         public Integer recordStart {get; set;}
        //         public Integer pageNumber {get; set;}
        //         public Integer totalRecords {get;set;}
        //         public Integer recordEnd {get; set;}
        //         public Integer pageSize {get;set;}
        //         public List<Product2> products {get;set;} 
        // }

        // @AuraEnabled
        // public static String getProductList(Integer pageSize, Integer pageNumber){
        //         String jsonObjItem = '';

        //         Integer offset = (pageNumber - 1) * pageSize;

        //         Integer totalRecords = [SELECT COUNT() FROM Product2];
        //         Integer recordEnd = pageSize * pageNumber;

        //         ProductItemWrapper prodObj = NEW ProductItemWrapper();
        //         prodObj.pageNumber = pageNumber;
        //         prodObj.pageSize = pageSize;
        //         prodObj.recordStart = offset + 1;
        //         prodObj.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        //         prodObj.totalRecords = totalRecords;
        //         prodObj.products = [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
        //                            FROM Product2 LIMIT :pageSize OFFSET :offset];

        //         jsonObjItem = JSON.serialize(prodObj);
                
        //         return jsonObjItem;

        // }
}