import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { invoke, view } from '@forge/bridge';

const App = () => {
  const [summary, setSummary] = useState();

  // Getting all the comments of the issue.
  useEffect(() => {
    const getCommentSummary = async () => {
      const commentsData = await invoke('getComments');
      console.log("Comments - " + commentsData);
      if (commentsData) {
        // ChatGPT prompt to get the summary
        const prompt = `Here is a sample data where all the comments of a jira issue is joined together: "${commentsData}". I want to summarize this in a way that anybody can get an idea what's going on in this issue without going through all the comments. Create a summary or TLDR for this.`

        // OpenAI API call to get the summary.
        const summary = await invoke('callOpenAI', { prompt });
        console.log("Summary - " + summary);
        setSummary(summary);
      }
    };
    getCommentSummary();
  }, []);

  console.log("Summary - " + summary);

  return (
    <>
      <Text>hello</Text>
      <Text>{summary}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
