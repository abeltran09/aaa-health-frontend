import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';

export default function AccountSettings() {
    const { user } = useUser();
    const router = useRouter();
    const handleEditProfile = () => {
        router.push('/settingpages/edit-profile')
      };

    const handleChangePassword = () => {
    router.push('/settingpages/change-password')
     };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>

            {/* User Profile Label */}
            <Text style={styles.profileLabel}>User Profile</Text>
            
            {/* User Profile Details */}
            <View style={styles.profileContainer}>
                <Text style={styles.profileText}>First Name: {user.firstname}</Text>
                <Text style={styles.profileText}>Last Name: {user.lastname}</Text>
                <Text style={styles.profileText}>Email: {user.email}</Text>
                <Text style={styles.profileText}>Phone Number: {user.phonenumber}</Text>
            </View>

            {/* Account Settings Option */}
            <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
                <Text style={styles.optionText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.line} />
            
            {/* Notifications Option */}
            <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
                <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>
            <View style={styles.line} />

            <TouchableOpacity style={styles.option} onPress={() => console.log('Delete User')}>
                <Text style={styles.optionText}>Delete Account</Text>
            </TouchableOpacity>
            
            <View style={styles.line} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    profileContainer: {
        backgroundColor: '#e0e0e0', // Light grey background
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    profileText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    option: {
        paddingVertical: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginVertical: 10,
    },
});


  
  