const getSchool = (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello get school ${schoolId}` });
};

const createSchool = (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello create school in ${schoolId}` });
};

const updateSchool = (req, res) => {
  // TODO
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello update school ${schoolId}` });
};

const deleteSchool = (req, res) => {
  // TODO (need to delete associated courses when this happens)
  const schoolId = req.params.schoolId;
  res.send({ data: `Hello delete school ${schoolId}` });
};

module.exports = {
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
};