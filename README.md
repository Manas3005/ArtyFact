# ArtyFact

The site is a place for the user to explore new art, and read about various artworks. Users can browse collections and generate their own. Users will be able to create journal entries. These journal entries serve as a blogspot to write about art and discuss it. Logged in users will be able to save their collections and journal entries. Users who are not sure of what they like can take the art quiz or describe their dream art piece, so that they can get recommended artworks that would be interesting to them. Users can search for artworks, or “explore” by category.

### What We Have Done So Far

#### Collections

- Users are able to view their own collections, interactively view the contents inside even without pressing on it as there is a slideshow showcasing the contents.
- A user is able to filter (search) their collections instead of scrolling down to find it. There is UI for adding a collection, but the feature is yet to implemented.

#### Find My Taste
The Find My Taste button from the home page takes the user to a page where there are two tabs. "Describe" and "Take the Art Quiz". For "Describe", so far there is some standard UI that allows the user to describe their dream artwork and click on See Results (non-functional at the moment). The second tab consists of an implemented third party component (progress bar) with a label showing the quiz progress. There are 10 questions of which two are completed with their options. Upon clicking submit after the last question, the user sees a list of artworks only associated with their favorite artists.
Finally, if the user leaves the quiz in the middle, they will be told on the homepage with their quiz progress displayed.

#### My Journals
The “My Journals” page of the website allows users to write down their thoughts regarding specific artworks they came across through our website, helping users organize their thoughts. The “My Journals” page provides the following functionality to the user:
- Add and edit new journal entries
- Each Journal Entry has input fields (journal entry title, date, mood(optional) and actual text content of the journal) for the user
- Save Journal Entry contents such as journal entry title, date, mood(optional) and actual text content of the journal
- See previous journal entries with their titles in the "Previous Journal Entries" section


#### Explore
The explore button will on press generate a toggle bar that the user can scroll up and down on in order to choose which genre of art that they want to further explore. At the moment it only logs the title that is pressed and we are currently trying to see what kind of query params that are used in order to filter.

### What We Are Still Planning To Do

#### Collections
- Associating each user to their collections.
- Generate their own collections via browsing artworks.
- Let users browse other users' collections.
- Creating the page showing each collections in further detail.
- A background aesthetic for the collections page.
- Generate a customized background styling for a given collection.


#### Find My Taste
The resulting artworks should be associated to responses from all quiz questions. The Describe tab would also show a list of recommended artworks by extracting query params from the user description (ambition is to use openAI API for this).
- User will be able to click on an artwork and see its details.
- User would also have a "see more like this" that would display artworks --similar to the one they were recommended on the details page. 

#### My Journal
- Delete a specific journal entry (implement unique entryID for each journal entry)
- Search, choose and add a specific artwork for individual journal entries (through Add artwork button on the “edit journal entry” page)
- User should be able to check the actual contents of a previously added journal entry
- Proper feedback about journal entries being saved and deleted needs to be added and shown to the user
- Not allowing the user to leave the "Edit Journal Entry" Page without saving changes, for eg. creating a pop-up to warn the user
- Some styling improvements - make consistent UX consistent with rest of the website
- Have at least one required field such as journal entry title, without which a journal entry cannot be saved.


#### Explore
We want to make it possible for the user to press on any of the genres and get sent to the explore page where art work of the specific type that they choose is being presented. Furthermore , we want to work on the search bar in which the user can search for any artwork that they want to see.

### File Structure
The project is divided into different folders, each responsible for a certain part of the application. Thee reactjs folder contains the presenters and the react root.

#### reactjs
- editEntryPresenter.jsx: Manages the entry editing functionality, allowing users to add or edit journal entries.
- MyCollectionsPresenter: Manages the collections, fetching, filtering, and state updates with Redux.
- homePagePresenter.jsx: Displays the homepage with random artwork, descriptions, and exploration features.
- myJournalsMainPresenter.jsx: Renders the main journal view, showing a list of journal entries with a top navigation bar.
- reactRoot.jsx: Sets up routing for the app, linking different views (homepage, journals, entry editor) using react-router-dom.

#### index
- index: Sets up the Redux store with myCollections and myJournalEntries, wraps the ReactRoot component in a Provider, and renders the app in the DOM.

##### Store
Since we are using Redux we have a store folder which replaces what we normally would call the model. Each file (slice) in this folder contains a part of the model. We have therefore divided the workload into different slices i.e different parts of the model.

- myCollections Slice: Defines a Redux slice for managing collections with no reducers implemented yet.
- myJournalEntries Slice: Manages journal entries in Redux, with actions to add and remove entries.
- findMyTaste Slice: Defines a Redux slice to manage the progress state for the "Find My Taste" feature, with actions to increment or decrement the progress, ensuring it stays between 0 and 100.

##### View
Contains the view files of the project, responsible for displaying different parts of the UI.

###### homePageView
- ArtDescBodyView.js: Displays artwork details with a description and context.
- ExploreBodyView.js: Provides an explore panel with options to find art preferences.
- TopBarView.js: Renders the top navigation bar with search, sign-in, and navigation options.

###### myCollectionsView
- ListOfCollectionsView: Displays a list of collections with images in a slideshow, navigating to a detailed view when an image is clicked.
- TopbarCollectionsView: Contains the top navigation bar with buttons for navigation, search functionality, and interaction with other parts of the app.

###### myJournalView
- EntryEditContentView.js: Handles the UI for editing journal entries and managing artwork.
- EntryEditTopBarView.js: Provides navigation and save options in the entry editing view.
- JournalEntriesListView.js: Displays a list of journal entries or an empty state message.
- JournalTopBarView.js: Offers navigation and options to add new journal entries.

###### findMyTasteView
- FindMyTasteTopBarView: Displays a top bar with two buttons ("Describe" and "Take the Art Quiz") that trigger respective views and change the button background color based on the active selection.
- DreamArtDescView: Renders a text area for users to describe their dream art piece and a button to see the results.
- ArtQuizView: Presents a quiz to the user with artist selection, progress tracking, and navigation buttons to move between questions, and handles custom events based on user choices


##### Utilities
- apiCall: Handles the different ways of fetching data from the API.
- apiConfig: Configurations to connect with the API.
- firebaseConfig: Firebase configurations.
- firebaseModel: Initializes the firebase with the app.


#### Third Party Components
- LinearWithValueLabel: A third-party component that displays a linear progress bar with a label showing the current progress percentage, using Material-UI components and accepting a value prop to determine the progress.
- sidebarNav: This React component defines a customizable Material-UI drawer with a list of categorized buttons, each triggering specific actions or logs when clicked.
