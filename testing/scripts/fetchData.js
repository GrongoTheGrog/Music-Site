import * as fetchDataModule from "../../scripts/fetchdata/fetchDataMainPage.js";

describe('Test suit: fetchData main page', () => {
  it('id is 581', async () => {
    const fetch = spyOn(fetchDataModule, 'fetchData').and.returnValue(
      Promise.resolve({ results: [{ id: '581' }] }) // Mocked response
    );

    const data = await fetchDataModule.fetchData();
    console.log(data);

    expect(data.results[0].id).toBe('581');
  })
})