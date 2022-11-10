const { User, CandidateStudent } = require('../models');
const axios = require('axios');

class Candidate {
  static async registerCandidate(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        ageOfBirth,
        lastEducation,
        photo,
        parentName,
        address,
        schoolName,
        FormalEducationId,
      } = req.body;

      const { data } = await axios({
        url: 'https://api-sekolah-indonesia.herokuapp.com/sekolah/s',
        method: 'get',
        params: {
          sekolah: schoolName,
        },
      });
      if (!data) {
        throw { name: 'dataNotFound' };
      }
      if (data.dataSekolah.length !== 1) {
        throw { name: 'dataNotFound' };
      }
      const candidate = await CandidateStudent.create({
        firstName,
        lastName,
        ageOfBirth,
        lastEducation,
        photo,
        parentName,
        address,
        schoolName: data.dataSekolah[0].sekolah,
        FormalEducationId,
        UserId: req.user.id,
      });
      res.status(201).json({ name: `${firstName} ${lastName}`, parentName });
    } catch (err) {
      next(err);
    }
  }

  static async updateCandidate(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        ageOfBirth,
        lastEducation,
        photo,
        parentName,
        address,
        schoolName,
        FormalEducationId,
      } = req.body;
      const { data } = await axios({
        url: 'https://api-sekolah-indonesia.herokuapp.com/sekolah/s',
        method: 'get',
        params: {
          sekolah: schoolName,
        },
      });
      if (!data) {
        throw { name: 'dataNotFound' };
      }
      if (data.dataSekolah.length !== 1) {
        throw { name: 'dataNotFound' };
      }
      const candidate = await CandidateStudent.update(
        {
          firstName,
          lastName,
          ageOfBirth,
          lastEducation,
          photo,
          parentName,
          address,
          schoolName: data.dataSekolah[0].sekolah,
          FormalEducationId,
        },
        { where: { id: req.user.id } }
      );

      res.status(200).json({ message: 'Candidate Student has been updated' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Candidate;
