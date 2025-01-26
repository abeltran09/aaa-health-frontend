import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { IP } from '@/context/route_ip';
import { useRouter } from 'expo-router';

export default function Anthropometric() {
    const { user } = useUser();
    const router = useRouter();

    const [formData, setFormData] = useState({
        height: '',
        weight: '',
    });

    // Handles height input formatting
    const handleHeightChange = (value = '') => {
        // Remove any non-numeric characters and any apostrophes/quotes
        const cleanedValue = value.replace(/[^0-9]/g, '');
    
        // Handle different input lengths with flexibility
        if (cleanedValue.length === 0) {
            // Empty input
            setFormData(prev => ({ ...prev, height: '' }));
        } else if (cleanedValue.length === 1) {
            // First digit (feet)
            setFormData(prev => ({ ...prev, height: cleanedValue }));
        } else if (cleanedValue.length === 2) {
            // Format as x' with first two digits
            const feet = cleanedValue.slice(0, 1);
            const firstInch = cleanedValue.slice(1);
            setFormData(prev => ({ ...prev, height: `${feet}'${firstInch}` }));
        } else if (cleanedValue.length === 3) {
            // Format as x'xx
            const feet = cleanedValue.slice(0, 1);
            const inches = cleanedValue.slice(1);
            setFormData(prev => ({ ...prev, height: `${feet}'${inches}"` }));
        } else if (cleanedValue.length === 4) {
            // Limit to x'xx" format
            const feet = cleanedValue.slice(0, 1);
            const inches = cleanedValue.slice(1, 3);
            const lastDigit = cleanedValue.slice(3);
            setFormData(prev => ({ ...prev, height: `${feet}'${inches}${lastDigit}"` }));
        }
    };

    // Handles weight input
    const handleWeightChange = (value = '') => {
        // Remove any non-numeric characters
        const cleanedValue = value.replace(/[^0-9.]/g, '');

        // Update weight in formData
        setFormData((prev) => ({ ...prev, weight: cleanedValue }));
    };

    // Save the data
    const handleSave = async () => {
        try {
            const requestData = new FormData();
            requestData.append('height', formData.height);
            requestData.append('weight', formData.weight);
            requestData.append('email', user.email);

            const response = await axios.post(
                `http://${IP}:8000/anthropometric/adding-anthropometrics/`,
                requestData
            );

            if (response.status === 200) {
                router.replace('(tabs)');
            }
        } catch (error) {
            console.error('Error entering measurements:', error);
            Alert.alert(
                'Error',
                error.response?.data?.message || 'An error occurred while entering measurements'
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Enter Your Details</Text>
                    <Text style={styles.label}>Height</Text>
                <TextInput
                    style={styles.input}
                    value={formData.height}
                    onChangeText={handleHeightChange}
                    placeholder="Enter height e.g., 5'10"
                    keyboardType="numeric"
                />

                {/* Weight Input */}
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your weight"
                    keyboardType="numeric"
                    value={formData.weight}
                    onChangeText={handleWeightChange}
                />

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                </View>

                {/* Height Input */}
                
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'E0F2F1',
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6, // For Android
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#81C784',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#81C784',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
