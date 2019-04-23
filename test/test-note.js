var sinon = require('sinon');
var expect = require('chai').expect;
require('sinon-mongoose');
var notesModel = require('../models/notes');

describe("note controller", () => {
    describe("Get all notes", function () {
        // Test will pass if we get all notes
        it("should return all note", function (done) {
            var NoteMock = sinon.mock(notesModel);
            var expectedResult = { status: true, note: [] };
            NoteMock.expects('find').yields(null, expectedResult);
            notesModel.find(function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });
        // Test will pass if we fail to get a note
        it("should return error", function (done) {
            var NoteMock = sinon.mock(notesModel);
            var expectedResult = { status: false, error: "Something went wrong" };
            NoteMock.expects('find').yields(expectedResult, null);
            notesModel.find(function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });

    // Test will pass if the note is saved
    describe("Add a new note", function () {
        it("should create new note", function (done) {
            var NoteMock = sinon.mock(new notesModel({ title: 'balmart', description: 'wow', body: 'Test', access: true }));
            var note = NoteMock.object;
            var expectedResult = { status: true };
            NoteMock.expects('save').yields(null, expectedResult);
            note.save(function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });
        // Test will pass if the note is not saved
        it("should return error, if note is not saved", function (done) {
            var NoteMock = sinon.mock(new notesModel({ sourceId: 'balmart', recipientId: 'yipi', body: 'Test' }));
            var note = NoteMock.object;
            var expectedResult = { status: false };
            NoteMock.expects('save').yields(expectedResult, null);
            note.save(function (err, result) {
                NoteMock.verify();
                NoteMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });
});