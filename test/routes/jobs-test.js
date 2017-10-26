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
var Job = require('../../models/jobs-model');

mongoose.connect('mongodb://localhost:27017/shyft', {useMongoClient: true});

var db = mongoose.connection;
mongoose.Promise = require('bluebird');

db.on('error', function(err){
});

db.once('open', function(){
});

describe('Jobs', function () {
    beforeEach(function (done) {

        Job.remove({}, function(err){

            if(err)
                done(err);
            else {
                var job1 = new Job();

                job1._id = "59f1e69dd0ae514f10a24a82";
                job1.title = "Couch";
                job1.desc = "Sold my couch online, no way to transport it";
                job1.size = "Fits in a Van";
                job1.cStreet = "122 Stillorgan Wood";
                job1.cTown = "Stillorgan";
                job1.cCounty = "Dublin";
                job1.cCoordinates = [
                    53.282694,
                    -6.211145
                ];
                job1.dStreet = "Roadford Doolin Clare";
                job1.dTown = "Doolin";
                job1.dCounty = "Clare";
                job1.dCoordinates = [
                    53.023793,
                    -9.30881
                ];
                job1.dTime = "2014-09-11T14:12:00.000Z";
                job1.price = 100.14;
                job1.photos = [
                    "/photos/job/0002/4.jpg",
                    "/photos/job/0003/5.jpg",
                    "/photos/job/0004/6.jpg"
                ];
                job1.userId = "59f9fb109bd9dc7f544cadfa";

                job1.save(function(err){
                    if(err)
                        console.log(err);
                    else {
                        var job2 = new Job();

                        job2._id = "59f1e69dd0ae514f10a24a83";
                        job2.title = "Couch";
                        job2.desc = "Sold my couch online, no way to transport it";
                        job2.size = "Fits in a Van";
                        job2.cStreet = "122 Stillorgan Wood";
                        job2.cTown = "Stillorgan";
                        job2.cCounty = "Dublin";
                        job2.cCoordinates = [
                            53.282694,
                            -6.211145
                        ];
                        job2.dStreet = "Roadford Doolin Clare";
                        job2.dTown = "Doolin";
                        job2.dCounty = "Clare";
                        job2.dCoordinates = [
                            53.023793,
                            -9.30881
                        ];
                        job2.dTime = "2014-09-11T14:12:00.000Z";
                        job2.price = 100.14;
                        job2.photos = [
                            "/photos/job/0002/4.jpg",
                            "/photos/job/0003/5.jpg",
                            "/photos/job/0004/6.jpg"
                        ];
                        job2.userId = "59f9fb109bd9dc7f544cadfa";

                        job2.save(function(err){
                            if(err)
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
    describe('GET /jobs', function () {
        it('should return all the jobs in the array', function (done) {
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
    describe('GET /job/:id', function () {
        it('should return a single job with certain id', function (done) {
            chai.request(server)
                .get('/jobs/59f1e69dd0ae514f10a24a82')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
    });
    describe('POST /job', function() {
        it('should return a confirmation message and an updated datastore', function (done){
            var newJob = {
                "title": "TEST",
                "desc": "TEST",
                "size": "TEST",
                "cStreet": "TEST",
                "cTown": "TEST",
                "cCounty": "TEST",
                "cCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dStreet": "TEST",
                "dTown": "TEST",
                "dCounty": "TEST",
                "dCoordinates": [
                    12.345678,
                    -12.345678
                ],
                "dTime": "2017-10-10T13:12:00.000Z",
                "price": "00.00",
                "photos": [
                    "/photos/job/0003/7.jpg",
                    "/photos/job/0003/8.jpg"
                ],
                "userId": "59f9fb109bd9dc7f544cadfa"
            };
            chai.request(server)
                .post('/jobs')
                .send(newJob)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Job Added!');
                    done();
                });
        });
    });
    
});


