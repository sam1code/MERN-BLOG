add config.env in config file

#PORT number
PORT = PORT_NUMBER

#MONGO DB URI
MONGO_DB_URI = 

# HOW MANY BLOGS YOU WANT PER PAGE
BLOG_PER_PAGE = 18

# JWT AND COOKIE RELATED 
JWT_SECRET= LONG_STRING
JWT_EXPIRE = EXPIRE_TIME
COOKIE_EXPIRE= EXPIRE_TIME

// MAILING SERVICE
SMPT_SERVICE= MAIL
SMPT_MAIL=EMAIL
SMPT_PASSWORD= PASSWORD




// 1--> register a user( https://sales-blink.herokuapp.com/api/register)*POST
   DETAILS NEEDED {
    "fullName":"Soum",
    "password":"12345678",
    "email":"samcse96@gmail.com"
}
// 2--> login users (https://sales-blink.herokuapp.com/api/login)*POST
   DETAILS NEEDED{
    "email":"samcse95@gmail.com",
    "password":"123456789"
}

// 3--> logout user (https://sales-blink.herokuapp.com/api/logout)*GET
// 4--> forget password(email sending) (https://sales-blink.herokuapp.com/api/password/forgot)*POST
DETAILS NEEDED{
"email":"samcse95@gmail.com"
}
// 5--> reset password(updating Password) (https://sales-blink.herokuapp.com/api/reset/:token)*PUT
DETAILS NEEDED{
   "password":"12345678",
    "confirmPassword":"12345678"
}
// 6--> Get user Detail (https://sales-blink.herokuapp.com/api/me)*GET

// 7--> update User Password (https://sales-blink.herokuapp.com/api/password/update)*PUT
DETAILS NEEDED{
   "oldPassword":"12345678",
    "newPassword":"12345678",
    "confirmPassword":"12345678"
}
// 8--> update user data (https://sales-blink.herokuapp.com/api/me/update)*PUT
DETAILS NEEDED{
    Fields want to update
}

=================POST APIS===================
// 1--> get all posts(https://sales-blink.herokuapp.com/api/)*GET
// 2--> get a post(https://sales-blink.herokuapp.com/api/post/:id)*GET
// 3--> create a new post --LOGGED IN(https://sales-blink.herokuapp.com/api/post/create)*POST
DETAILS NEEDED{
    REFER PHOTO
}
// 4--> update a post --LOGGED IN(https://sales-blink.herokuapp.com/api/post/:id)*PUT
DETAILS NEEDED{
    Fields want to update
}
// 5--> delete a post --LOGGED IN(https://sales-blink.herokuapp.com/api/post/:id)*DELETE


================COMMENT APIS================
// 1--> create a new comment --LOGGED IN(https://sales-blink.herokuapp.com/api/create)*POST
DETAILS NEEDED
    {
    "postId":"621402b20c395a723718cb7f",
    "commentText":"hey this is a comment"
}

// 2--> update a comment --LOGGED IN(https://sales-blink.herokuapp.com/api/:id)*PUT
DETAILS NEEDED{
    Fields want to update
}
// 3--> delete a comment --LOGGED IN(https://sales-blink.herokuapp.com/api/:id)*DELETE


done
