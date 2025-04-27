# DF16F2 Coding Challenge

Coding challenge submission by Samuel Gibson

## Running the project

1. Ensure a server is running with the endpoint `http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph`
   or use [frontendchallengeserver](https://github.com/mosaic-avantos/frontendchallengeserver). This will mock the api required by the app.

2. With the server running, build the project with `npm run build`, then run the app with `npm run preview`. This will host the app at `http://localhost:4173/`.

### Data sources

Currently prefill options are Global Data and previous form's data. To add new data sources, simply add another PrefillDataSource component to FormField.

```tsx
<Box p={2} overflow="scroll" height="100%" sx={{ backgroundColor: 'lightgrey' }}>
  <Typography>Available data</Typography>
  <PrefillDataSource
    onOptionClicked={setSelectedOption}
    selectedOption={selectedOption}
    label={'Global Data'}
    dataPrefix={'Global'}
    options={GLOBAL_DATA}
  />
  {Object.entries(prefillOptions).map(([key, value]) => (
    <PrefillDataSource
      onOptionClicked={setSelectedOption}
      selectedOption={selectedOption}
      label={key}
      dataPrefix={key}
      options={value}
    />
  ))}
</Box>
```
