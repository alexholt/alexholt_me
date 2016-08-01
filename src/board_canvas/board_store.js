import { Dispatcher } from 'flux';
import { EventEmitter } from 'fbemitter';
import { sample } from 'lodash';

/*
     │ 0  │ 1  │ 2  │
  ┌──┴─┬──┴─┬──┴─┬──┴─┐
  │ 3  │ 4  │ 5  │ 6  │
┌─┴──┬─┴──┬─┴──┬─┴──┬─┴──┐
│ 7  │ 8  │ 9  │ 10 │ 11 │
└─┬──┴─┬──┴─┬──┴─┬──┴─┬──┘
  │ 12 │ 13 │ 14 │ 15 │
  └──┬─┴──┬─┴──┬─┴──┬─┘
     │ 16 │ 17 │ 18 │
*/

const TILES = [
  'desert',
  'field',
  'forest',
  'mountain',
  'pasture',
  'quarry',
];

const generateSampleArray = (counts) => {
  const sampleArray = [];
  for (var prop in counts) {
    for (var i = 0; i < counts[prop]; i++) {
      sampleArray.push(prop);
    }
  }
  const randomArray = [];
  while (sampleArray.length > 0) {
    const item = sample(sampleArray);
    sampleArray.splice(sampleArray.indexOf(item), 1);
    randomArray.push(item);
  }
  return randomArray;
};

const data = {
  counts: {
    desert: 1,
    field: 4,
    forest: 4,
    mountain: 3,
    pasture: 4,
    quarry: 3,
    unassigned: 0,
  },

  board: [],
};

data.board = generateSampleArray(data.counts);

const boardDispatcher = new Dispatcher();
const emitter = new EventEmitter();

const actionMap = {
  'count-update': ({ terrainType, count }) => {
    if (terrainType != null && count != null) {
      if (terrainType !== 'unassigned') {
        data.counts.unassigned += data.counts[terrainType] - count;
      }
      data.counts[terrainType] = count;
    }
    data.board = generateSampleArray(data.counts);
    emitter.emit('update', data);
  },
};

boardDispatcher.register((payload) => {
  actionMap[payload.actionType](payload);
});

export const dispatch = boardDispatcher::boardDispatcher.dispatch;
export const addEventListener = emitter::emitter.addListener;
export const init = () => {
  emitter.emit('update', data);
};
