export const bigExp = (x, y = 18) => `${x}${''.padEnd(y, '0')}`

export const accounts = [
  '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
  '0xffcf8fdee72ac11b5c542428b35eef5769c409f0',
  '0x22d491bde2303f2f43325b2108d26f1eaba1e32b',
  '0xe11ba2b4d45eaed5996cd0823791e0c93114882d',
  '0xd03ea8624c8c5987235048901fb614fdca89b117',
]

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
