const { User, CandidateStudent } = require('../models');

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
        FormalEducationId,
      } = req.body;
      const candidate = await CandidateStudent.create({
        firstName,
        lastName,
        ageOfBirth,
        lastEducation,
        photo,
        parentName,
        address,
        FormalEducationId,
        UserId : req.user.id
      })
      res.status(201).json({name: `${firstName} ${lastName}`, parentName})
    } catch (err) {
      next(err);
    }
  }

  static async updateCandidate(req, res, next){
    try {
        const {
            firstName,
            lastName,
            ageOfBirth,
            lastEducation,
            photo,
            parentName,
            address,
            FormalEducationId,
          } = req.body;
          const candidate = await CandidateStudent.update({
            firstName,
            lastName,
            ageOfBirth,
            lastEducation,
            photo,
            parentName,
            address,
            FormalEducationId,
          }, {where: {id: req.user.id}}) 

          res.status(200).json({message: 'Candidate Student has been updated'})
    } catch (err) {
        next(err)
    }
  }
}

module.exports = Candidate