   import { expect } from 'chai';
   import mongoose from 'mongoose';
   import * as userController from '../controllers/userController.js';
   import Users from '../models/userModel.js';
   import Verification from '../models/emailVerification.js';

   describe('User Controller Tests', () => {
     const testUserData = {
       firstName: 'TestFirstName',
       lastName: 'TestLastName',
       email: 'testuser@example.com',
       contact: '1234567890',
       location: 'TestLocation',
       profileUrl: 'https:  example.com/testuser',
       jobTitle: 'TestJobTitle',
       about: 'TestAbout',
     };

     beforeEach(async () => {
       await Users.deleteMany({});
       await Verification.deleteMany({});
     });

     it('should update user profile', async () => {
       const existingUser = await Users.create(testUserData);

       const req = {
         body: { user: { userId: existingUser._id }, ...testUserData },
       };
       const res = {
         status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
       };

       await userController.updateUser(req, res, () => {});

       expect(res.status().statusCode).to.equal(200);
       expect(res.status().data.success).to.be.true;
       expect(res.status().data.user).to.have.property('_id');
     });

     it('should get user profile', async () => {       //Kullanıcı profilinin başarıyla alınıp alınamadığını kontrol eder.
       const existingUser = await Users.create(testUserData);

       const req = { body: { user: { userId: existingUser._id } } };
       const res = {
         status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
       };

       await userController.getUser(req, res, () => {});

       expect(res.status().statusCode).to.equal(200);
       expect(res.status().data.success).to.be.true;
       expect(res.status().data.user).to.have.property('_id');
     });

     it('should verify user email', async () => {
       const existingUser = await Users.create(testUserData);
       const existingVerification = await Verification.create({
         userId: existingUser._id,
         expiresAt: Date.now() + 3600000, 
         token: 'testToken',
       });

       const req = {
         params: { userId: existingUser._id, token: 'testToken' },
       };
       const res = {
         redirect: (url) => ({ url }),
       };

       await userController.verifyEmail(req, res);

     });

     // Diğer fonksiyonlar için de benzer test senaryolarını ekleyebilirsiniz
   });