  import { expect } from 'chai';
  import * as jobController from '../controllers/jobController.js';
  import Jobs from '../models/jobsModel.js';
  import Companies from '../models/companiesModel.js';

  describe('Job Controller Tests', () => {
    const testJobData = {
      jobTitle: 'TestJob',
      jobType: 'Full-time',
      location: 'TestLocation',
      salary: 'TestSalary',
      vacancies: 3,
      experience: 'TestExperience',
      desc: 'TestDesc',
      requirements: 'TestRequirements',
    };

    beforeEach(async () => {
      await Jobs.deleteMany({});
      await Companies.deleteMany({});
    });

    it('should create a new job post', async () => {
      const existingCompany = await Companies.create({
        name: 'TestCompany',
        email: 'testcompany@example.com',
        password: 'password123',
      });

      const req = {
        body: { user: { userId: existingCompany._id }, ...testJobData },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await jobController.createJob(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.job).to.have.property('_id');
    });

    it('should update an existing job post', async () => {
      const existingCompany = await Companies.create({
        name: 'TestCompany',
        email: 'testcompany@example.com',
        password: 'password123',
      });

      const existingJob = await Jobs.create({
        ...testJobData,
        company: existingCompany._id,
      });

      const req = {
        body: { user: { userId: existingCompany._id }, ...testJobData },
        params: { jobId: existingJob._id },
      };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await jobController.updateJob(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.jobPost).to.have.property('_id');
    });

    it('should get job posts', async () => {
      await Jobs.create(testJobData);

      const req = { query: {} };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await jobController.getJobPosts(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.totalJobs).to.equal(1);
      expect(res.status().data.data).to.be.an('array');
    });

    it('should get job by ID', async () => {
      const existingCompany = await Companies.create({
        name: 'TestCompany',
        email: 'testcompany@example.com',
        password: 'password123',
      });

      const existingJob = await Jobs.create({
        ...testJobData,
        company: existingCompany._id,
      });

      const req = { params: { id: existingJob._id } };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await jobController.getJobById(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.data).to.have.property('_id');
      expect(res.status().data.similarJobs).to.be.an('array');
    });

    it('should delete a job post', async () => {
      const existingCompany = await Companies.create({
        name: 'TestCompany',
        email: 'testcompany@example.com',
        password: 'password123',
      });

      const existingJob = await Jobs.create({
        ...testJobData,
        company: existingCompany._id,
      });

      const req = { params: { id: existingJob._id } };
      const res = {
        status: (statusCode) => ({ json: (data) => ({ statusCode, data }) }),
      };

      await jobController.deleteJobPost(req, res, () => {});

      expect(res.status().statusCode).to.equal(200);
      expect(res.status().data.success).to.be.true;
      expect(res.status().data.messsage).to.equal('Job Post Delted Successfully.');
    });

    // Diğer fonksiyonlar için de benzer test senaryolarını ekleyebilirsiniz
  });