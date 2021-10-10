// why ? html string shown has wrong style.

/**

@react dangerouslySetInnerHTML,

function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

 */

// take the style from the old popup and define unified styles for this one.
//
//
// we set it in data-display because Typography is also here.




