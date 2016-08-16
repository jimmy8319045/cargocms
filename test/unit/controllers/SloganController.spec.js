describe.only('about Slogan Controller operation.', function() {
  let test_slogan = null;
  before(async (done) => {
    try{
      test_slogan = await Slogan.create({
        content: 'hello',
        source: 'Ash Ketchum'
      });
      //console.log(test_slogan);
      done();
    }
    catch(e){
      done(e);
    }
  });
  it('delete Slogan should success.', async (done) => {
    try {
      const res = await request(sails.hooks.http.app)
      .delete(`/api/slogan/${test_slogan.id}`)
      //console.log(res.status);
      res.status.should.be.eq(200);

      let result = await Slogan.findOne({
        where:{id: test_slogan.id}
      });
      (result === null ).should.be.true;

      done();
    } catch (e) {
      done(e);
    }
  });
});
