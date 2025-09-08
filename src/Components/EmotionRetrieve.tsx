const EmotionRetrieve = () => {
  return <div>EmotionRetrieve</div>;
};

export default EmotionRetrieve;

// TODO: emotions should be analyzed at submit. So, <EmotionAnalyzer /> should be called in AddPost.tsx
// and then that should be updated into the database at submit as well.
//
// Only then will emotions be retrieved from database using <EmotionRetrieve /> probably with parameter
// post_test.id
//
// This component will be added to Post.tsx as the div that displays emotion analysis
