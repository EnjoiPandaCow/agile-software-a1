var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../../bin/www');
var mongoose = require('mongoose');
var after = require('lodash');
var _ = require('lodash');
mongoose.Promise = global.Promise;
chai.use(chaiHttp);
chai.use(require('chai-things'));
var User = require('../../models/users-model');

mongoose.connect('mongodb://localhost:27017/shyft', {useMongoClient: true});

var db = mongoose.connection;
mongoose.Promise = require('bluebird');

db.on('error', function(err){
});

db.once('open', function(){
});

describe('Users', function () {
    beforeEach(function (done) {

        User.remove({}, function (err) {

            if (err)
                done(err);
            else {
                var user1 = new User();

                user1._id = "59f6f0b99bd9dc7f544d7dac";
                user1.fName = "CJ";
                user1.lName = "O'Sullivan";
                user1.email = "cjosullivan@hotmail.co.uk";
                user1.contactNo = "0831555552";
                user1.password = "Password1";
                user1.street = "Polerone";
                user1.town = "Mooncoin";
                user1.county = "Kilkenny";


                user1.save(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var user2 = new User();

                        user2._id = "59f6f14b9bd9dc7f544d7ddc";
                        user2.fName = "Shannon";
                        user2.lName = "Murphy";
                        user2.email = "shaancaatherine@hotmail.com";
                        user2.contactNo = "0858216464";
                        user2.password = "Password2";
                        user2.street = "An Reailin";
                        user2.town = "Carrightowhil";
                        user2.county = "Cork";

                        user2.save(function (err) {
                            if (err)
                                console.log(err);
                            else {
                                done();
                            }
                        });
                    }
                });
            }
        });
    });
    describe('GET /users', function () {
        it('should return all the users in the array', function (done) {
            chai.request(server)
                .get('/users')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });
    describe('GET /users/:id', function () {
        it('should return a single user with certain id', function (done) {
            chai.request(server)
                .get('/users/59f6f0b99bd9dc7f544d7dac')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });
});