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

describe('Jobs', function () {
    beforeEach(function (done) {
        mongoose.connection.collections.jobs.drop(function () {
            mongoose.connection.collections.jobs.insertMany(
                [
                    {
                        "_id": "59f1e69dd0ae514f10a24a81",
                        "title" : "Couch",
                        "desc" : "Sold my couch online, no way to transport it",
                        "size" : "Fits in a Van",
                        "cStreet" : "122 Stillorgan Wood",
                        "cTown" : "Stillorgan",
                        "cCounty" : "Dublin",
                        "cCoordinates" : [
                            53.282694,
                            -6.211145
                        ],
                        "dStreet" : "Roadford Doolin Clare",
                        "dTown" : "Doolin",
                        "dCounty" : "Clare",
                        "dCoordinates" : [
                            53.023793,
                            -9.30881
                        ],
                        "dTime" : "2014-09-11T14:12:00.000Z",
                        "price" : 100.14,
                        "photos" : [
                            "/photos/job/0002/4.jpg",
                            "/photos/job/0003/5.jpg",
                            "/photos/job/0004/6.jpg"
                        ],
                        "userId" : "59f9fb109bd9dc7f544cadfa"
                    },
                    {
                        "_id": "59f1e69dd0ae514f10a24a82",
                        "title" : "Pet Supplies",
                        "desc" : "Please deliver inside doors by register",
                        "size" : "Fits in the Back Seat of a Car",
                        "cStreet" : "Petco, 28 The Mall",
                        "cTown" : "Newery",
                        "cCounty" : "Down",
                        "cCoordinates" : [
                            54.180558,
                            -6.339021
                        ],
                        "dStreet" : "Main Street",
                        "dTown" : "Adare",
                        "dCounty" : "Limerick",
                        "dCoordinates" : [
                            52.564611,
                            -8.789048
                        ],
                        "dTime" : "2017-10-10T13:12:00.000Z",
                        "price" : "35.41",
                        "photos" : [
                            "/photos/job/0003/7.jpg",
                            "/photos/job/0003/8.jpg"
                        ],
                        "userId" : "59f9fb109bd9dc7f544cadfa"
                    }
                ]);
            done();
        });
    });
    describe('GET /jobs', function () {
        it('should return all the donations in an array', function (done) {
            chai.request(server)
                .get('/jobs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });
});


