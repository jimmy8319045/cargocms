var feelingData = require("./feeling.json");

describe.only('import data.', () => {
  /*
  {
    "Scent":"BU2",
    "cfeeling":"木質",
    "totalrepeat":18,
    "score":6,"color":"#B35721"
  },
  */
  before(async (done) => {
    try {
      const scarray = [{"Scent":"B1","color":"#E16EA3"},{"Scent":"BU2","color":"#B35721"},{"Scent":"B3","color":"#E16EA3"},{"Scent":"T4","color":"#E87728"},{"Scent":"B5","color":"#E87728"},{"Scent":"M6","color":"#F4D521"},{"Scent":"B7","color":"#E16EA4"},{"Scent":"B8","color":"#E14035"},{"Scent":"B9","color":"#DB1583"},{"Scent":"M10","color":"#DB1583"},{"Scent":"M11","color":"#E04136"},{"Scent":"T12","color":"#F4D420"},{"Scent":"B13","color":"#B35721"},{"Scent":"T14","color":"#307059"},{"Scent":"BU15","color":"#E16EA3"},{"Scent":"B16","color":"#433E77"},{"Scent":"B17","color":"#911D31"},{"Scent":"M18","color":"#6DB965"},{"Scent":"BU19","color":"#DB1182"},{"Scent":"M20","color":"#E04136"},{"Scent":"M21","color":"#6DB965"},{"Scent":"M22","color":"#6DB965"},{"Scent":"M23","color":"#6DB965"},{"Scent":"T24","color":"#E87728"},{"Scent":"T25","color":"#E87728"},{"Scent":"M26","color":"#307059"},{"Scent":"BU27","color":"#DB1583"},{"Scent":"BX28","color":"#B35721"},{"Scent":"T29","color":"#DB1182"},{"Scent":"M30","color":"#BA2C89"},{"Scent":"T31","color":"#E04136"},{"Scent":"M32","color":"#84835B"},{"Scent":"BU33","color":"#433E77"},{"Scent":"TX34","color":"#F4D420"},{"Scent":"B35","color":"#F4D420"},{"Scent":"MU36","color":"#433E77"},{"Scent":"M37","color":"#E87728"},{"Scent":"T38","color":"#E04136"},{"Scent":"T39","color":"#E16EA3"},{"Scent":"T40","color":"#E04136"},{"Scent":"B41","color":"#E04136"},{"Scent":"M42","color":"#DB1182"},{"Scent":"M43","color":"#6DB965"},{"Scent":"T44","color":"#84835B"},{"Scent":"B45","color":"#911D31"},{"Scent":"M46","color":"#307059"},{"Scent":"BX47","color":"#1B98B8"},{"Scent":"T48","color":"#E16EA3"},{"Scent":"B49","color":"#E04136"},{"Scent":"B50","color":"#84835B"},{"Scent":"MA51","color":"#E16EA3"},{"Scent":"BA52","color":"#433E77"},{"Scent":"TA53","color":"#F4D420"},{"Scent":"MA54","color":"#E04136"},{"Scent":"MA55","color":"#E04136"},{"Scent":"BA56","color":"#1B98B8"},{"Scent":"TA57","color":"#6DB965"},{"Scent":"MA58","color":"#E04136"},{"Scent":"TA59","color":"#433E77"},{"Scent":"BA60","color":"#B35721"},{"Scent":"BA61","color":"#911D31"},{"Scent":"TA62","color":"#E87728"},{"Scent":"M63","color":"#E87728"},{"Scent":"B64","color":"#E87728"},{"Scent":"MA65","color":"#B25721"},{"Scent":"TA66","color":"#E87728"},{"Scent":"TA67","color":"#E87728"},{"Scent":"TA68","color":"#E87728"},{"Scent":"BA69","color":"#84825B"},{"Scent":"BA70","color":"#B35721"},{"Scent":"BA71","color":"#E87728"},{"Scent":"MA72","color":"#433E77"}];
      for (const sc of scarray) {
        const scentNote = (await ScentNote.findOrCreate({
          where: {color: sc.color},
          defaults: {color: sc.color},
        }))[0];
        const scent = await Scent.create({name: sc.Scent});
        await scentNote.addScent(scent);
      }
      done();
    } catch (e) {
      done(e);
    }
  });

  it.only('import feeling', async (done) => {
    try {
      let path = __dirname+"/feeling.json";
      await ScentNote.importFeelingFromFile({path});
      done();

    } catch (e) {
      done(e);
    }

  });

});
