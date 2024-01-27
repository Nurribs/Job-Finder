  import { expect } from 'chai';
  import mongoose from 'mongoose';
  import * as companiesController from '../controllers/companiesController.js';
  import Companies from '../models/companiesModel.js';

  describe('Companies Controller Tests', () => {
    const testCompanyData = {
      name: 'TestCompany',
      email: 'testcompany@example.com',
      password: 'password123',
    };

    beforeEach(async () => {
      await Companies.deleteMany({});
    });

    it('should register a new company', async () => {
      const req = {
        body: { ...testCompanyData },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await companiesController.register(req, res, () => {});

      expect(res.status().statusCode).to.equal(201);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.user).to.have.property('_id');
      expect(res.status().data.token).to.exist;
    });

    it('should sign in an existing company', async () => {
      await Companies.create(testCompanyData);

      const req = {
        body: { email: testCompanyData.email, password: testCompanyData.password },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await companiesController.signIn(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.user).to.have.property('_id');
      expect(res.status().data.token).to.exist;
    });

    it('should update company profile', async () => {
      const existingCompany = await Companies.create(testCompanyData);

      const req = {
        body: {
          user: { userId: existingCompany._id },
          name: 'UpdatedCompany',
          contact: 'UpdatedContact',
          location: 'UpdatedLocation',
          about: 'UpdatedAbout',
        },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await companiesController.updateCompanyProfile(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.company).to.have.property('_id');
      expect(res.status().data.token).to.exist;
    });

    it('should get company profile', async () => {
      const existingCompany = await Companies.create(testCompanyData);

      const req = {
        body: { user: { userId: existingCompany._id } },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await companiesController.getCompanyProfile(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.data).to.have.property('_id');
    });

      //Diğer fonksiyonlar için de benzer test senaryolarını ekleyebilirsiniz
  });