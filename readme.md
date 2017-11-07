# Assignment 1 - API testing and Source Control.

Name: Christopher O'Sullivan

## Overview.

For this project I am developing a peer to peer package delivery system called Shyft. 
Shyft will match people who need packages or goods delivered with people already heading that way. 
Thousands of cars are traveling across the country every day with just one person in them leaving a huge amount of space going unused. 
I want to use this space and fill it with the massive amount of new and used goods that are being sold online in Ireland today.

Currently at this stage we have user's and job's where the users can set up a profile and add a job to the database.
Users can be added, deleted, updated, searched for and displayed as an overall group at this time and the same goes for jobs.

## API endpoints.
 -- Users --
 + GET /users - Get all users.
 + GET /users/:id - Get a users by ID.
 + POST /users - Add a User. 
 + PUT /users/:id - Update any value associated with a specific user. 
 + DELETE /users/:id - Delete a specific user.
 + POST /users/search - Search all keys values associated with a user for any matches.
 
 -- Jobs --
  + GET /jobs - Get all jobs.
  + GET /jobs/:id - Get a jobs by ID.
  + POST /jobs - Add a Job. 
  + PUT /jobs/:id - Update any value associated with a specific job. 
  + DELETE /jobs/:id - Delete a specific job.
  + POST /jobs/search - Search all keys values associated with a jobs for any matches.

## Data storage.
Below are the schema's for both Users and Jobs. I have also included a sample document for each.

-- User Schema -- 
```
fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    }
 ```
    
-- Sample User Document -- 
```
    {
        "_id" : ObjectId("59f6f0b99bd9dc7f544d7dac"),
        "county" : "Kilkenny",
        "town" : "Mooncoin",
        "street" : "Polerone",
        "password" : "Password1",
        "contactNo" : "0831555552",
        "email" : "cjosullivan@hotmail.co.uk",
        "lName" : "O'Sullivan",
        "fName" : "CJ",
        
    }
```
    
-- Job Schema -- 
```
     title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: false
        },
        size: {
            type: String,
            required: true
        },
        cStreet: {
          type: String,
          required: true
        },
        cTown: {
            type: String,
            required: true
        },
        cCounty: {
            type: String,
            required: true
        },
        cCoordinates: {
            type: [Number],
            index: '2dsphere'
        },
        dStreet: {
            type: String,
            required: true
        },
        dTown: {
            type: String,
            required: true
        },
        dCounty: {
            type: String,
            required: true
        },
        dCoordinates: {
            type: [Number],
            index: '2dsphere'
        },
        dTime: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        photos: {
            type: [String],
            required: false
        },
        userId: {
            type: String,
            required: true
        }
```

-- Sample Job Document -- 
```
    {
        "_id" : ObjectId("59f1e69dd0ae514f10a24a82"),
        "userId" : "59f9fb109bd9dc7f544cadfa",
        "price" : 100.14,
        "dTime" : ISODate("2014-09-11T14:12:00.000Z"),
        "dCoordinates" : [ 
            53.023793, 
            -9.30881
        ],
        "dCounty" : "Clare",
        "dTown" : "Doolin",
        "dStreet" : "Roadford Doolin Clare",
        "cCoordinates" : [ 
            53.282694, 
            -6.211145
        ],
        "cCounty" : "Dublin",
        "cTown" : "Stillorgan",
        "cStreet" : "122 Stillorgan Wood",
        "size" : "Fits in a Van",
        "desc" : "Sold my couch online, no way to transport it",
        "title" : "Couch",
        "photos" : [ 
            "/photos/job/0002/4.jpg", 
            "/photos/job/0003/5.jpg", 
            "/photos/job/0004/6.jpg"
        ],
    }
```

## Sample Test execution.


        C:\Users\CJ O'Sullivan\Desktop\shyft-web-app-dev-2.0>mocha test/routes/*
        
        
          Jobs
            GET /jobs
        GET /jobs 200 46.194 ms - 1045
              √ should return all the jobs in the array (111ms)
            GET /job/:id
        GET /jobs/59f1e69dd0ae514f10a24a82 200 9.550 ms - 523
              √ should return a single job with certain id
        GET /jobs/59f1e69dd0ae514f10a24a8 404 7.031 ms - 55
              √ should return an error message and a 404 error
            POST /jobs
        POST /jobs 200 78.541 ms - 24
              √ should return a confirmation message and an updated datastore (87ms)
        POST /jobs 400 10.433 ms - 85
              √ should return an error message and a 400 error
            PUT /jobs/:id
        PUT /jobs/59f1e69dd0ae514f10a24a82 200 19.631 ms - 25
              √ should return a confirmation message and an updated datastore
        PUT /jobs/59f1e69dd0ae514f10a24a8 400 2.157 ms - 52
              √ should return an error message and a 400 error
            DELETE /jobs/:id
        DELETE /jobs/59f1e69dd0ae514f10a24a82 200 7.001 ms - 38
              √ should delete a job with a certain id
        DELETE /jobs/59f1e69dd0ae514f10a24a8 400 4.272 ms - 52
              √ should return an error message and a 400 error
        
          POST /jobs/search - Happy Cases
        POST /jobs/search 200 23.169 ms - 1045
            √ should return a title that contains all or part of value
            POST /jobs/search - Error Cases
        POST /jobs/search 404 7.750 ms - 49
              √ should return an error message and a 404 error - no value that matches sent value
        POST /jobs/search 404 8.230 ms - 49
              √ should return an error message and a 404 error - bad key
        
          Users tests
            GET /users
        GET /users 200 7.317 ms - 445
              √ should return all the users in the array
            GET /users/:id
        GET /users/59f6f0b99bd9dc7f544d7dac 200 8.394 ms - 220
              √ should return a single user with certain id
        GET /users/59f6f0b99bd9dc7f544d7da 404 3.031 ms - 56
              √ should return an error message and a 404 error
            POST /users
        POST /users 200 13.948 ms - 25
              √ should return a confirmation message and an updated datastore
        POST /users 400 4.411 ms - 74
              √ should return an error message and a 400 error
            PUT /users/:id
        PUT /users/59f6f0b99bd9dc7f544d7dac 200 5.325 ms - 26
              √ should return a confirmation message and an updated datastore
        PUT /users/59f6f0b99bd9dc7f544d7da 400 2.725 ms - 61
              √ should return an error message and a 400 error
            DELETE /users/:id
        DELETE /users/59f6f0b99bd9dc7f544d7dac 200 8.039 ms - 39
              √ should delete a user with a certain id
        DELETE /users/59f6f0b99bd9dc7f544d7da 400 1.522 ms - 53
              √ should return an error message and a 400 error
            POST /users/search
        POST /users/search 200 6.148 ms - 226
              √ should return a name that contains all or part of value
              POST /users/search - Error Cases
        POST /users/search 404 3.876 ms - 50
                √ should return an error message and a 404 error - no value that matches sent value
        POST /users/search 404 3.456 ms - 50
                √ should return an error message and a 404 error - bad key
        
        
          24 passing (1s)



## Extra features.
- MongoDB Integration 
- Clearing and Repoulating MongoDB before each test. 
 