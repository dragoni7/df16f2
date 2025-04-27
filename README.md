# DF16F2 Coding Challenge

Coding challenge submission by Samuel Gibson. Built with Vite, React, Typescript, and MUI.

## Running the project

1. Ensure a server is running with the endpoint `http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph`
   or use [frontendchallengeserver](https://github.com/mosaic-avantos/frontendchallengeserver). This will mock the api required by the app.

2. With the server running, build the project with `npm run build`, then run the app with `npm run preview`. This will host the app at `http://localhost:4173/`.

### Data sources

Currently prefill options are Global Data and previous form's data. To add new data sources, simply add another [PrefillDataSource](https://github.com/dragoni7/df16f2/blob/main/src/features/FormGraph/components/PrefillDataSource.tsx) component to [FormField](https://github.com/dragoni7/df16f2/blob/main/src/features/FormGraph/components/FormField.tsx).

```tsx
<Box p={2} overflow="scroll" height="100%" sx={{ backgroundColor: 'lightgrey' }}>
  <Typography>Available data</Typography>

   {/* Global Data */}
  <PrefillDataSource
    onOptionClicked={setSelectedOption}
    selectedOption={selectedOption}
    label={'Global Data'}
    dataPrefix={'Global'}
    options={GLOBAL_DATA}
  />

   {/* Previous Form Data */}
  {Object.entries(prefillOptions).map(([key, value]) => (
    <PrefillDataSource
      onOptionClicked={setSelectedOption}
      selectedOption={selectedOption}
      label={key}
      dataPrefix={key}
      options={value}
    />
  ))}

   {/* Example Addition */}
  <PrefillDataSource
    onOptionClicked={setSelectedOption}
    selectedOption={selectedOption}
    label={'Example Data'}
    dataPrefix={'Example'}
    options={['option1', 'option2', 'option3']}
  />
</Box>
```
### Adding new features

New features can be added by including a new folder for the feature in the features directory. Features should be organized by components, api, hooks, types, and util to encourage seperation of concern and decoupling.
