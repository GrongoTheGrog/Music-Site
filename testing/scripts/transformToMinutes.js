import transformToMinutes from "../../scripts/utils/transformToMinutes.js";

describe('Test suit: transformToMinutes', () => {
  it('Works with more than 60 seconds', () => {
    const minutes = transformToMinutes(180);

    expect(minutes).toEqual('3 min 0 s')
  })

  it('Works with less than 60 seconds', () => {
    const minutes = transformToMinutes(20);

    expect(minutes).toEqual('20 s')
  })

  it('Works with 0', () => {
    const minutes = transformToMinutes(0);

    expect(minutes).toEqual('0 s')
  })
})