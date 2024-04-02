## SearchForm Component

- Provides a search input and button to trigger iTunes searches.
- Manages loading state and basic error display.
- Broadcasts search results via Broadcast Channels for cross-component communication.

## ResultsList Component

- Renders iTunes search results in a list format.
- Includes filter options for narrowing down results based on wrapper type and media kind.
- Subscribes to a Broadcast Channel to receive search result updates.
- Stores results in session storage for persistence.
- Optimizes rendering with list virtualization.

## ResultItem Component

- Renders individual iTunes search results in a card format.
- Displays artwork, track name, artist name, wrapper type, and kind.

## FilterOptions Component

- Provides dropdown menus to filter iTunes search results by:

* **Wrapper Type:** (e.g., Track, Audiobook, Feature Movie)
* **Kind:** (e.g., Song, Podcast, TV Episode)

## useFetchSearchResults Hook

- Fetches data from the iTunes API based on a search term.
- Provides loading and error states.
- Implements debouncing to prevent excessive API calls.

**Usage**

- **SearchForm** searches and broadcasts results.
  currently, there is a bug with the search button. When you do your first search: it opens the resultList page, but it doesn't render the list. In order to display the list, after the page is open, edit the input string to update it, or press enter instead of clicking the button.
- **Error Handling:** Consider adding more robust error handling in `useFetchSearchResults`.
- **CSS:** Improve CSS with more tailwind styles and schadcn (ex: select in result list)
- **Unit tests:** Add unit tests using react-testing-library
