function createQuery(type) {
    switch (type) {
        case "addUserPassword":
            return sql = `
        INSERT INTO project.passwords ( user_name ,password) 
        VALUES (?, ?);
        `;
        case "addUserInfo": return sql = `
            INSERT INTO project.user_info (user_id,name,email,city,phone , allowed ,  manger) 
            VALUES (?, ?, ?, ?, ?, ${true}  , ${false});
            `;
        case "addManegerInfo": return sql = `
            INSERT INTO project.user_info (user_id,name,email,city,phone , allowed ,  manger) 
            VALUES (?, ?, ?, ?, ?, ${true}  , ${true});
            `;
        case "addCar":
            return sql = `
            INSERT INTO project.cars(user_id,product_details,cost,
                km,statuse,year_of_production,several_years_in_use,company,product_type  , imageFilePath )
            VALUES (?, ? , ? ,? ,? ,? , ? , ? ,? , ? )`;
        case "addFurniture":
            return sql = `
            INSERT INTO project.furniture(user_id,product_details , cost,product_type ,several_years_in_use,statuse, imageFilePath)
            VALUES (?, ?, ?, ?, ? ,?)
            `;
        case "addAppliance":
            return sql = `
            INSERT INTO project.appliances(user_id,product_details , cost,product_type ,several_years_in_use,statuse,model , imageFilePath)
            VALUES (?, ?, ?, "appliance", ? , ? , ?  , ?)
            `;
        case "addAnimal":
            return sql = `
            INSERT INTO project.animals(user_id,product_details , cost,product_type, age ,health_condition, imageFilePath)
            VALUES (?, ?, ?, ?, ? , ?)
            `;
        case "addBusinesse":
            return sql = `
            INSERT INTO project.businesses(user_id,product_details , cost,product_type,several_years_open ,expected_profit_per_year ,place ,imageFilePath)
            VALUES (?, ?, ?, ?, ? , ? , ?)
            `;
        case "addAds":
            return sql = `
            INSERT INTO project.ads(user_id ,product_id ,product_type )
            VALUES (?, ?, ? )
            `;
        case "addMessage":
            return sql = `
            INSERT INTO project.user_messages(user_id ,sender_id ,body )
            VALUES ( ?, ?  , ?)
            `;
        case "addManager": return sql = `
            INSERT INTO project.manager (id) 
            VALUES (?);
            `;
        default:
            return;
    }
}

function getAllQuery(type) {
    switch (type) {
        case "getAllUsers":
            return sql = `
            SELECT user_info *
            FROM user_info
            `;
        case "getAllCars":
            return sql = `
            SELECT cars.*
            FROM cars
            `;
        case "getAllFurniture":
            return sql = `
            SELECT furniture.*
            FROM furniture
            WHERE furniture.user_id = ?
            `;
        case "getAllAppliances":
            return sql = `
            SELECT appliances.*
            FROM appliances
            `;
        case "getAllAnimals":
            return sql = `
            SELECT animals.*
            FROM animals
            WHERE animals.user_id = ?
            `;
        case "getAllBusinesses":
            return sql = `
            SELECT businesses.*
            FROM businesses
            WHERE businesses.user_id = ?
            `;
        case "getAllAds":
            return sql = `
            SELECT 
            ra.user_id , p *
            FROM reserved_ads ra JOIN um.product_type p
            ON ra.product_id_id = p.id
            WHERE ra.user_id = ? 
            `;
        case "getAllMessages":
            return sql = `
            SELECT *
            FROM user_messages
            WHERE user_id = ?
            `;
        default:
            return;
    }
}

function getQuery(type) {
    switch (type) {
        case "getUserPassword":
            return sql = `
            SELECT passwords.user_id
            FROM passwords
            WHERE passwords.user_name = ? AND passwords.password= ? `;
        case "getUserInfo":
            return sql = `
            SELECT user_info.*
            FROM user_info
            WHERE user_info.user_id = ?  
            `;
        case "getCar":
            return sql = `
            SELECT cars.*
            FROM cars
            WHERE cars.user_id = ? AND cars.id = ?
            `;
        case "getFurniture":
            return sql = `
            SELECT furniture.*
            FROM furniture
            WHERE furniture.user_id = ? AND furniture.id = ?
            `;
        case "getAppliance":
            return sql = `
            SELECT appliances.*
            FROM appliances
            WHERE appliances.user_id = ? AND appliances.id = ?
            `;
        case "getAnimal":
            return sql = `
            SELECT animals.*
            FROM animals
            WHERE animals.user_id = ? AND animals.id = ?
            `;
        case "getBusinesse":
            return sql = `
            SELECT businesses.*
            FROM businesses
            WHERE businesses.user_id = ? AND businesses.id = ?
            `;
        case "getAds":
            return sql = `
            SELECT 
            ra.user_id , p *
            FROM reserved_ads ra JOIN um.product_type p
            ON ra.product_id_id = p.id
            WHERE ra.user_id = ? AND ra.product_id=? AND ra.product_type=?
            `;
        case "getMessage":
            return sql = `
            SELECT 
            um.messages_id, um.user_id,um.body,ui.name AS sender_name,ui.email AS sender_email,ui.city AS sender_city,
            ui.phone AS sender_phone,
            FROM user_messages um JOIN user_info ui 
            ON um.sender_id = ui.user_id
            WHERE um.user_id = ? AND um.messege = ?
            `;
        case "getNextCarId":
            return sql = `
             SELECT LAST_INSERT_ID() +  1
            `;
        case "getNextFurnitureId":
            return sql = `
            SELECT MAX(furniture.id) +1
            FROM furniture
            `;
        case "getNextApplianceId":
            return sql = `
            SELECT MAX(appliances.id) +1
            FROM appliances
            `;
        case "getNextAnimalId":
            return sql = `
            SELECT MAX(animals.id) +1
            FROM animals
            `;
        case "getNextBusinessId":
            return sql = `
            SELECT MAX(businesses.id) +1
            FROM businesses
            `;
        default:
            return;
    }
}

function updateQuery(type) {
    switch (type) {
        case "updateUserInfo":
            return sql = `
            UPDATE user_info 
            SET user_info.name = ?,user_info.email = ? , user_info.city = ?,  user_info.phone = ?
            WHERE user_info.user_id = ?`;
        case "updateUserPassword":
            return sql = `
            UPDATE passwords
            SET  passwords.password= ? ,passwords.user_name= ? 
            WHERE passwords.user_id = ?
            `;
        case "updateUserAllowed":
            return sql = `
            UPDATE user_info 
            SET user_info.allowed = ?
            WHERE user_info.user_id = ?`;
        case "updateCar":
            return sql = `
            UPDATE cars 
            SET cars.product_details = ?,cars.cost = ?, cars.km = ?, cars.statuse = ? ,
            cars.year_of_production =  ?, cars.several_years_in_use=?, cars.company =? , cars.product_type =? ,cars.imageFilePath = ? 
            WHERE cars.id = ?`;
        case "updateFurniture":
            return sql = `
            UPDATE furniture 
            SET furniture.product_details = ?,furniture.cost = ?, furniture.product_type = ?, 
            furniture.several_years_in_use = ? , fortunes.statuse =? , furniture.imageFilePath = ?
            WHERE furniture.id = ?`;
        case "updateAppliance":
            return sql = `
            UPDATE appliances 
            SET appliances.product_details = ?,appliances.cost = ?, appliances.product_type = ?, appliances.several_years_in_use = ?
            ,appliances.statuse =? ,appliances.model =? , appliances.imageFilePath = ?
            WHERE appliances.id = ?`;
        case "updateAnimal":
            return sql = `
            UPDATE animals 
            SET animals.product_details = ?,animals.cost = ?, animals.product_type = ?, animals.age = ? , animals.health_condition = ? , animals.imageFilePath = ?
            WHERE animals.id = ?`;
        case "updateBusinesse":
            return sql = `
            UPDATE businesses 
            SET businesses.product_details = ?,businesses.cost = ?, businesses.product_type = ?, businesses.several_years_open = ?,
            businesses.expected_profit_per_year =?  ,businesses.place =?  , businesses.imageFilePath  = ? 
            WHERE businesses.id = ?`;
        default:
            return;
    }
}

function deleteQuery(type) {
    switch (type) {
        case "deleteCar":
            return sql = `
            DELETE 
            FROM  cars
            WHERE cars.id = ? 
            `;
        case "deleteFurniture":
            return sql = `
            DELETE 
            FROM  furniture
            WHERE furniture.id = ? OR furniture.dateAdded = ? 
            `;
        case "deleteAppliance":
            return sql = `
            DELETE 
            FROM  appliances
            WHERE appliances.id = ?
            `;
        case "deleteAnimal":
            return sql = `
            DELETE 
            FROM  animals
            WHERE animals.id = ? OR animals.dateAdded = ? 
            `;
        case "deleteBusinesse":
            return sql = `
            DELETE    
            FROM  businesses
            WHERE businesses.id = ? OR businesses.dateAdded = ? 
           `;
        case "deleteUserMessage":
            return sql = `
            DELETE    
            FROM  user_messages
            WHERE user_messages.messages_id = ? 
            `;
        case "deleteReservedAds":
            return sql = `
            DELETE    
            FROM  reserved_ads
            WHERE reserved_ads.user_id = ? AND reserved_ads.product_id = ? AND reserved_ads.product_type = ?
            `;
        default:
            return;
    }
}

const crudQuery = {
    createQuery,
    getAllQuery,
    getQuery,
    updateQuery,
    deleteQuery,
};
module.exports = crudQuery;