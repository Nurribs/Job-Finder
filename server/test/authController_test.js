import { expect } from 'chai';
import { register, signIn } from '../controllers/authController.js';
import Users from '../models/userModel.js';
import mongoose from "mongoose";

describe('Auth Controller Tests', () => {

  const testUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  beforeEach((done) => {
    Users.deleteMany({}).then(() => {
      done();
    }).catch((err) => {
      done(err); // Hata durumunda done() fonksiyonuna hatayı ileterek beforeEach'i başarısız yap
    },1000);
  },1000);

  it('should register a new user', (done) => {
    const req = {
      body: { ...testUserData },
    };
    const res = {
      status: (statusCode) => ({ send: (data) => ({ statusCode, data }) }),
    };

    register(req, res, () => {
      expect(res.status().statusCode).to.equal(201);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.user).to.have.property('_id');
      expect(res.status().data.token).to.exist;
      done();
    });
  });

  it('should sign in an existing user', (done) => {
    Users.create(testUserData).then(() => {
      const req = {
        body: { email: testUserData.email, password: testUserData.password },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      signIn(req, res, () => {
        expect(res.status().statusCode).to.equal(201);
        expect(res.status().data.success).to.be.true;
        expect(res.status().data.user).to.have.property('_id');
        expect(res.status().data.token).to.exist;
        done();
      });
    }).catch((err) => {
      done(err); // Hata durumunda done() fonksiyonuna hatayı ileterek testi başarısız yap
    });
  });

  // Diğer senaryoları ekleyebilirsiniz

});
