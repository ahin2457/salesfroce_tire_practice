public with sharing class CustomProduct {
    @AuraEnabled
      public static List<Product2> getProducts(){
        
        return [SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                FROM Product2 ORDER BY Name ASC LIMIT 1000];
        }

        // search
        @AuraEnabled
        public static List<Product2> searchProduct(String searchString){
            String searchKeyword = '%' + searchString + '%';
            List<Product2> resultSearch =[SELECT Id, Name, Material__c, Desciption__c, Desciption2__c, Division__c, Car_Type__c,Brand__c, S_Width__c, Tire_Type__c, Type__c ,Net_Weight__c, Pattern__c, Sales_Pattern__c, Performance__c 
                                      FROM Product2 
                                      WHERE Name LIKE :searchKeyword OR Material__c LIKE : searchKeyword OR Brand__c LIKE : searchKeyword OR Tire_Type__C LIKE :searchKeyword OR Car_Type__c LIKE :searchKeyword LIMIT 100];
                return resultSearch;
        }

}