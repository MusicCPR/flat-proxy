const appId = "60a51c906bcde01fc75a3ad0";
const NEA_CREATE_TOOLSET_ID = "64be80de738efff96cc27edd";

const chordScaleBucketsInEb = {
  tonic: {
    scoreId: "64c0993a9638a82f130dc549",
    sharingKey:
      "bd6ef69e50c7822c1f2fc5b262c553b048cf1f60add3ee9cdb1e85536b8f0d18de20b69fe6089b40e4910ba68d762c4218f00410d5d07368f021ae7298fb99c7",
  },
  subdominant: {
    scoreId: "64c099d94d7650a3d9ba7598",
    sharingKey:
      "19663d1b0e19b5f9ff11ad28b80c45546693499c94ed5d7c992bdeb9f7c58e968a219144a3aabaa05845947089607d51d25a37fe94a3ca6fcf14e67cff361c3d",
  },
  dominant: {
    scoreId: "64c09a22168dab0ff8733c35",
    sharingKey:
      "adaf25a2ea6be22b81af0658dbff5d0537625d171f9c2fed3406c6ad39a24c3ffaf87cfc662672f5aa11d0d8d9f09989567bde6c8d028586b11873d7596030c0",
  },
};

const chromaticScale = [
  {
    sharp: {
      step: "C",
      alter: "",
    },
    flat: {
      step: "C",
      alter: "",
    },
  },
  {
    sharp: {
      repr: "C#",
      alter: "1",
      step: "C",
    },
    flat: {
      repr: "Db",
      alter: "-1",
      step: "D",
    },
  },
  {
    sharp: {
      repr: "D",
      alter: "",
      step: "D",
    },
    flat: {
      repr: "D",
      alter: "",
      step: "D",
    },
  },
  {
    sharp: {
      repr: "D#",
      alter: "1",
      step: "D",
    },
    flat: {
      repr: "Eb",
      alter: "-1",
      step: "E",
    },
  },
  {
    sharp: {
      repr: "E",
      alter: "",
      step: "E",
    },
    flat: {
      repr: "E",
      alter: "",
      step: "E",
    },
  },
  {
    sharp: {
      repr: "F",
      alter: "",
      step: "F",
    },
    flat: {
      repr: "F",
      alter: "",
      step: "F",
    },
  },
  {
    sharp: {
      repr: "F#",
      alter: "1",
      step: "F",
    },
    flat: {
      repr: "Gb",
      alter: "-1",
      step: "G",
    },
  },
  {
    sharp: {
      repr: "G",
      alter: "",
      step: "G",
    },
    flat: {
      repr: "G",
      alter: "",
      step: "G",
    },
  },
  {
    sharp: {
      repr: "G#",
      alter: "1",
      step: "G",
    },
    flat: {
      repr: "Ab",
      alter: "-1",
      step: "A",
    },
  },
  {
    sharp: {
      repr: "A",
      alter: "",
      step: "A",
    },
    flat: {
      repr: "A",
      alter: "",
      step: "A",
    },
  },
  {
    sharp: {
      repr: "A#",
      alter: "1",
      step: "A",
    },
    flat: {
      repr: "Bb",
      alter: "-1",
      step: "B",
    },
  },
  {
    sharp: {
      repr: "B",
      alter: "",
      step: "B",
    },
    flat: {
      repr: "B",
      alter: "",
      step: "B",
    },
  },
];

const noteToScaleIdx = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

function getChordScaleInKey(chordScale, key) {
  let alter = "sharp";
  if (key.includes("b") || key === "F") {
    alter = "flat";
  }

  const tonicBucketIntervals = [
    { name: "1", offset: 0 }, // Unison
    { name: "2", offset: 2 }, // Major 2nd
    { name: "3", offset: 4 }, // Major 3rd
    { name: "5", offset: 7 }, // Perfect 5th
    { name: "6", offset: 9 }, // Major 6th
  ];

  const subdominantBucketIntervals = [
    { name: "1", offset: 0 }, // Unison
    { name: "2", offset: 2 }, // Major 2nd
    { name: "4", offset: 5 }, // Perfect 4th
    { name: "5", offset: 7 }, // Perfect 5th
    { name: "6", offset: 9 }, // Major 6th
  ];

  const dominantBucketIntervals = [
    { name: "2", offset: 2 }, // Major 2nd
    { name: "4", offset: 5 }, // Perfect 4th
    { name: "5", offset: 7 }, // Perfect 5th
    { name: "6", offset: 9 }, // Major 6th
    { name: "7", offset: 11 }, // 7th
  ];

  const chordScaleIntervals = {
    tonic: tonicBucketIntervals,
    subdominant: subdominantBucketIntervals,
    dominant: dominantBucketIntervals,
  };

  const firstPitchIdx = noteToScaleIdx[key];
  const firstPitchObj = chromaticScale[firstPitchIdx];
  let octave = 4;
  const mapped = chordScaleIntervals[chordScale].map((interval) => {
    if (
      Math.floor((firstPitchIdx + interval.offset) / chromaticScale.length) > 0
    ) {
      octave = 5;
    }

    const result =
      chromaticScale[(firstPitchIdx + interval.offset) % chromaticScale.length][
        alter
      ];
    result.octave = "" + octave;
    return result;
  });
  console.log(`chord scale buckets for ${chordScale} in key ${key}`, mapped);
  return mapped;
}

const nonNegative = ["C", "G", "D", "A", "E", "B", "F#", "C#"];
const negatives = {
  "-1": "F",
  "-2": "Bb",
  "-3": "Eb",
  "-4": "Ab",
  "-5": "Db",
  "-6": "Gb",
  "-7": "Cb",
};
const CIRCLE_OF_FIFTHS = Object.assign({}, nonNegative, negatives);

const keyFromScoreJSON = (pieceScoreJSON) => {
  // console.log(CIRCLE_OF_FIFTHS);
  // console.log('problem here geting key', pieceScoreJSON, pieceScoreJSON?.["score-partwise"]?.part?.[0]?.measure?.[0]?.attributes?.[0]?.key?.fifths)
  const keySignature = {
    repr: CIRCLE_OF_FIFTHS[
      pieceScoreJSON["score-partwise"]["part"][0]["measure"][0][
        "attributes"
      ][0]["key"]["fifths"]
    ],
    keyAsJSON:
      pieceScoreJSON["score-partwise"]["part"][0]["measure"][0][
        "attributes"
      ][0]["key"],
  };
  // console.log('pieceScoreJSON["score-partwise"]["part"][0]["measure"][0]', pieceScoreJSON["score-partwise"]["part"][0]["measure"][0])
  return keySignature;
};

const embedTransposed = (
  bucket,
  embed,
  template,
  keySig,
  instrName,
  octaveShift
) => {
  // change the notes in the score from whatever they are in tonic and eb to what we're given
  const scorePart =
    template?.["score-partwise"]?.["part-list"]?.["score-part"]?.[0];
  scorePart["part-name"] = instrName; //embed.instrumentName;
  scorePart["part-abbreviation"] = instrName; //embed.instrumentAbbreviation;
  scorePart["score-instrument"]["instrument-name"] = instrName; //embed.instrumentName;
  template?.["score-partwise"]?.part?.[0]?.measure?.[0]?.note?.forEach(
    (note, i) => {
      note.pitch.step = bucket[i].step;
      note.pitch.octave = bucket[i].octave;
      if (bucket[i].alter) {
        note.pitch.alter = bucket[i].alter;
      } else if (note.pitch.alter) {
        delete note.pitch.alter;
      }
    }
  );

  // change the key signature in the score from whatever it is in tonic and eb to what we're given
  template?.["score-partwise"]?.part?.[0]?.measure?.[0]?.attributes?.forEach(
    (element) => {
      if (element.key) {
        element.key.fifths = keySig.keyAsJSON.fifths;
      }
    }
  );

  if (octaveShift !== 0) {
    template?.["score-partwise"]?.part?.[0]?.measure?.[0]?.attributes?.forEach(
      (element) => {
        element.transpose = {
          chromatic: "0",
          "octave-change": `${octaveShift}`,
        };
      }
    );
  }

  const resultTransposed = embed.ready().then(() => {
    return embed.loadJSON(template);
  });
  return resultTransposed;
};

const bucketToString = (bucket) => {
  let alter = "";
  return bucket
    .map((note) => {
      if (note.alter) {
        if (note.alter == -1) {
          alter = `♭`;
        } else if (note.alter == 1) {
          alter = "♯";
        }
      }
      return note.step + alter + note.octave;
    })
    .join(" ");
};

//once the student's reference score is loaded (drBbEmbed), check its key signature and then get the corresponding chord scale buckets?
const refToChordScaleBuckets = (
  refEmbed,
  tonicEmbed,
  subdominantEmbed,
  dominantEmbed,
  scaleDegreeElems,
  instrName,
  octaveShift = 0
) => {
  return refEmbed
    .ready()
    .then(() => {
      return refEmbed.getJSON();
    })
    .then((pieceScoreJSON) => {
      const keySignature = keyFromScoreJSON(pieceScoreJSON); //this is a cheat code: i check the metadata of THIS STUDENT (already accounting for their instrument and the piece's composition key) as a letter like F
      const tonicBucket = getChordScaleInKey("tonic", keySignature.repr);
      scaleDegreeElems.tonic.innerHTML = `<output>${bucketToString(
        tonicBucket
      )}</output`;

      const subdominantBucket = getChordScaleInKey(
        "subdominant",
        keySignature.repr
      );
      scaleDegreeElems.subdominant.innerHTML = `<output>${bucketToString(
        subdominantBucket
      )}</output`;

      const dominantBucket = getChordScaleInKey("dominant", keySignature.repr);
      scaleDegreeElems.dominant.innerHTML = `<output>${bucketToString(
        dominantBucket
      )}</output`;
      console.log(
        "tonicBucket",
        tonicBucket,
        "subdominantBucket",
        subdominantBucket,
        "dominantBucket",
        dominantBucket
      );

      return fetch("tonic-eb-as-minimized.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        })
        .then((data) => {
          return embedTransposed(
            tonicBucket,
            tonicEmbed,
            data,
            keySignature,
            instrName,
            octaveShift
          )
            .then(() => {
              return embedTransposed(
                subdominantBucket,
                subdominantEmbed,
                data,
                keySignature,
                instrName,
                octaveShift
              );
            })
            .then(() => {
              return embedTransposed(
                dominantBucket,
                dominantEmbed,
                data,
                keySignature,
                instrName,
                octaveShift
              );
            });
        });
    })
    .catch((err) => {
      console.error("err in preparing refEmbed", err);
    });
};

const pitchesToRests = (pieceScoreJSON) => {
  const getMeasureTimeSignature = (measure, current) => {
    let duration = 8; //default to 8 because i reasoned it might be a quarter in some cases
    let maxRests = 4; //bc 4 is a common denominator for musicians
    let updated = false;
    if (measure.attributes) {
      measure.attributes.forEach((attribute) => {
        if (attribute.divisions) {
          duration = attribute.divisions;
          updated = true;
        }
        if (attribute.time) {
          if (attribute.time.beats) {
            maxRests = attribute.time.beats;
            updated = true;
          }
        }
      });
    }
    if (updated) {
      return { duration, maxRests };
    }
    return current;
  };
  console.log("pieceScoreJSON", pieceScoreJSON);
  const composeScoreJSON = pieceScoreJSON;
  // nathan!
  let duration = 8; //default to 8 becasue i reasoned it might be a quarter in some cases
  let maxRests = 4; //bc 4 is a common denominator for musicians

  let currentTimeSig = {
    duration,
    maxRests,
  };
  // if (composeScoreJSON["score-partwise"].part[0].measure[0]) {
  //   const firstMeasure = composeScoreJSON["score-partwise"].part[0].measure[0];

  // }
  composeScoreJSON["score-partwise"].part[0].measure.forEach((measure) => {
    currentTimeSig = getMeasureTimeSignature(measure, currentTimeSig); //FIXME: this overwrites later measures with the default
    if (measure.direction) {
      measure.direction.forEach((directionObj) => {
        if (directionObj["direction-type"]) {
          directionObj["direction-type"] = undefined;
        }
        if (directionObj.sound) {
          directionObj.sound = undefined;
        }
      });
    }

    const bucketColors = ["#E75B5C", "#265C5C", "#4390E2"];

    // measure.note = Array(currentTimeSig.maxRests).fill({rest: {}, duration:currentTimeSig.duration})
    measure.note = Array.from({ length: currentTimeSig.maxRests }, (i, j) => {
      return {
        rest: {},
        duration: currentTimeSig.duration.toString(),
        "$adagio-location": {
          timePos: j * duration,
        },
        // '$color': bucketColors[j%bucketColors.length],
      };
    });

    // measure.note.forEach((note) => {
    //   note.rest = {}
    //   note.pitch = undefined
    //   note.beam = undefined;
    //   note.dot = undefined;
    //   note.tie = undefined;
    //   note.notations = undefined;
    // })
  });
  console.log("composeScoreJSON", composeScoreJSON);
  return composeScoreJSON;
};
