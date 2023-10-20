public WITH sharing class contactPaginationLwcCtrl {
 
    public class ContactItemWrapper {       
        public INTEGER recordStart {GET;SET;}
        public INTEGER pageNumber {GET;SET;}
        public INTEGER totalRecords {GET;SET;}
        public INTEGER recordEnd {GET;SET;}
        public INTEGER pageSize {GET;SET;}       
        public List<Contact> contacts {GET;SET;}
    }
 
    @AuraEnabled
    public static String getContactList(INTEGER pageSize, INTEGER pageNumber){
        String jsonObjItm = '';
 
 
        INTEGER offset = (pageNumber - 1) * pageSize;         
 
        INTEGER totalRecords = [SELECT COUNT() FROM Contact];
        INTEGER recordEnd = pageSize * pageNumber;
 
        ContactItemWrapper conObj =  NEW ContactItemWrapper();  
        conObj.pageNumber = pageNumber;
        conObj.pageSize = pageSize;        
        conObj.recordStart = offset + 1;
        conObj.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        conObj.totalRecords = totalRecords;
        conObj.contacts = [SELECT Id, Name, FirstName, LastName, Email, Phone, Title FROM Contact LIMIT :pageSize OFFSET :offset];
        jsonObjItm = JSON.serialize(conObj);
        RETURN jsonObjItm;
    }
 
}