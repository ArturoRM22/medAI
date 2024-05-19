import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const fetchUserConversations = async () => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken();
    const response = await fetch('/user-conversations', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user conversations');
    }
    const conversations = await response.json();
    console.log('User conversations:', conversations);
  } catch (error) {
    console.error('Error fetching user conversations:', error);
  }
};

export default function Test() {
  useEffect(() => {
    fetchUserConversations();
  }, []);

  return <div>Check console for user conversations</div>;
}
