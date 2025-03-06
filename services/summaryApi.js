import axios from 'axios';

const MEETING_SUMMARY_URL = process.env.NEXT_PUBLIC_MEETING_SUMMARY_URL;

const getPath = (path) => {
  return `${MEETING_SUMMARY_URL}/${path}`;
};

export const getMeetingSummary = async (formData) => {
  try {
    const data = await axios.post(getPath("analyze-meeting"), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data.analysis;
  } catch (error) {
    console.error("Error fetching meeting summary:", error);
    return null;
  }
};
