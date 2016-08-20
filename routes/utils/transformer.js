var User = require('../models/user');
var transformer = function() {
    var transformJsonToUser = function(user, jsonData){
       
        // Location 
        var location = {}
        location["address"] = (jsonData.address) ? jsonData.address : "" ;
        location["city"] = (jsonData.city) ? jsonData.city : "";
        location["latitude"] = (jsonData.latitude) ? jsonData.latitude : "";
        location["longtitude"] = (jsonData.longtitude) ? jsonData.longtitude : "";
        user.location = location;
        
        // Created At
        let unix = Math.round((new Date()).getTime() / 1000);
        user.createdAt = unix + "";
        // Phone Number
        user.phoneNumber = jsonData.phoneNumber;
        user.email = jsonData.email;
        user.password = jsonData.password;
        user.username= jsonData.username;
        user.firstname = jsonData.firstname;
        user.lastname = jsonData.lastname;
        user.isFemale= jsonData.isFemale;
        // Profile Image
        var profileImage = {}
        profileImage["imageUrl"] = jsonData.imageUrl;
        profileImage["width"] = jsonData.width;
        profileImage["height"] = jsonData.height;
        user.profileImage = profileImage;

        // Add data for Worker
        user.isWorker = jsonData.isWorker
        console.log("IsWorker: ")
        console.log(jsonData.isWorker)
        if (user.isWorker) {
            user.rating = []; 
            user.averageRating = 0;
            user.category = jsonData.category;
        }
    };

    var transformJsonToTicket = function(ticket, jsonData){
        
        ticket.title =  jsonData.title;
        ticket.category = jsonData.category;

        // Ticket Images
        var imageOne = {};
        var imageTwo = {};
        var imageThree = {};
        
        imageOne["imageUrl"] = jsonData.imageOneUrl;
        imageOne["width"] = jsonData.width;
        imageOne["height"] = jsonData.height;
        ticket.ticketImages.push(imageOne);

        imageTwo["imageUrl"] = jsonData.imageTwoUrl;
        imageTwo["width"] = jsonData.width;
        imageTwo["height"] = jsonData.height;
        ticket.ticketImages.push(imageTwo);
        
        imageThree["imageUrl"] = jsonData.imageThreeUrl;
        imageThree["width"] = jsonData.width;
        imageThree["height"] = jsonData.height;
        ticket.ticketImages.push(imageThree);

        // Status 
        ticket.status = jsonData.status;

        // CreatedAt
        let unix = Math.round((new Date()).getTime() / 1000);
        ticket.createdAt = unix + "";

        // CreateBy
        var createBy = {};
        createBy["id"] = jsonData.idUser;
        createBy["username"] = jsonData.nameOfUser;
        createBy["phoneNumber"] = jsonData.phoneOfUser;
        // Profile image User
        var profileImageUser = {}
        profileImageUser["imageUrl"] = jsonData.imageUserUrl;
        profileImageUser["width"] = jsonData.widthOfProfile;
        profileImageUser["height"] = jsonData.heightOfProfile;
        createBy["profileImage"] = profileImageUser;
        ticket.createBy = createBy;

        // Location
        var location = {}
        location["address"] = jsonData.address;
        location["city"] = jsonData.city;
        location["latitude"] = jsonData.latitude;
        location["longtitude"] = jsonData.longtitude;
        ticket.location = location;

        // Responsible
        var responsible = {}
        responsible["id"] = jsonData.idWorker;
        responsible["username"] = jsonData.nameOfWorker;
        responsible["phoneNumber"] = jsonData.phoneOfWorker;
        responsible["price"] = "";
        ticket.responsible = responsible;

        // Profile image Worker
        var profileImageWorker = {}
        profileImageWorker["imageUrl"] = jsonData.imageWorkerUrl;
        profileImageWorker["width"] = jsonData.widthOfProfile;
        profileImageWorker["height"] = jsonData.heightOfProfile;
        responsible["profileImage"] = profileImageWorker;
        ticket.responsible = responsible;

        // Urgent
        ticket.urgent = jsonData.urgent;
        ticket.workingHour = jsonData.workingHour;
        ticket.description = jsonData.description;
        ticket.payment = jsonData.payment;
    };
    return {
      transformJsonToUser: transformJsonToUser,
      transformJsonToTicket: transformJsonToTicket
    }
}();
module.exports = transformer;