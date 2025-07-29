
import React, { useState } from 'react';
import { View, Text, TextInput, Button, SectionList, StyleSheet, Image} from 'react-native';


export default function App() {
  const [sectionName, setSectionName] = useState('');
  const [sections, setSections] = useState([
    { title: 'Default Podcast', data: ['https://media.istockphoto.com/id/174655938/photo/rose-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=PMnbutkiSJSgNu-f8smIE8x9mTlZM_n4LGtClTllV00=', 'Review'] }
  ]);
  const [textImage, setTextImage] = useState('');
  const [textReview, setTextReview] = useState('');

  const addSection = () => {
    if (sectionName.trim() !== '') {
      setSections([...sections, { title: sectionName, data: [textImage, textReview] }]);
      setSectionName('');
      setTextImage('');
      setTextReview('');
    }
    console.log(sections)
  };
  const removeSection = () => {
  if (sections.length > 0) { // Optional: prevent removing the default section
    const updatedSections = sections.slice(0, -1); // Creates a new array without the last element
    setSections(updatedSections); // This triggers a re-render
  }
};

  return (
    <View style={styles.container}>
    <TextInput
        style={styles.input}
        placeholder="Name..."
        value={sectionName}
        onChangeText={setSectionName}
      />
      <TextInput
        style={styles.input}
        placeholder="Image Address..."
        value={textImage}
        onChangeText={setTextImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Review..."
        value={textReview}
        onChangeText={setTextReview}
      />
      <Button title="Add Podcast" onPress={addSection} />

      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
  if (index === 0)
    if (item.startsWith('http')) {
      return (
        <Image
          source={{ uri: item }}
          style={styles.image}
          resizeMode="cover"
        />
      )
    } else {
      return <Text style={styles.listItem}>{"Image is invalid"}</Text>;
    }
    return <Text style={styles.listItem}>{item}</Text>;
}}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
  <Button title="Delete Newest Podcast" onPress={removeSection} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#eee', padding: 5 },
  listItem: { padding: 10, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  image: {
  width: '100%',
  height: 200,
  marginBottom: 10,
  borderRadius: 8,
},
});