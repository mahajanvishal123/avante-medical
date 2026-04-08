import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const CustomSelect = ({ label, value, placeholder, onPress }) => {
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.selectLabel}>{label}</Text>
      <TouchableOpacity style={styles.selectBox} onPress={onPress}>
        <Text style={[styles.selectValue, !value && { color: '#999' }]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#24458B" />
      </TouchableOpacity>
    </View>
  );
};

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [form, setForm] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    role: '',
    region: '',
    password: '',
    confirmPassword: '',
  });

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      {/* Blue Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Employee Onboarding</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introSection}>
            <Text style={styles.title}>New Employee Account</Text>
            <Text style={styles.description}>
              Please fill in the details below to register a new employee on the Avante Medical LMS. This will create their unique profile and access credentials.
            </Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Employee ID"
              placeholder="e.g. EMP-12345"
              value={form.employeeId}
              onChangeText={(val) => updateForm('employeeId', val)}
            />

            <CustomInput
              label="Full Name"
              placeholder="e.g. Dr. Sarah Jenkins"
              value={form.fullName}
              onChangeText={(val) => updateForm('fullName', val)}
            />

            <CustomInput
              label="Email Address"
              placeholder="sarah.jenkins@avantemedical.com"
              value={form.email}
              onChangeText={(val) => updateForm('email', val)}
              keyboardType="email-address"
            />

            <CustomSelect
              label="Role"
              placeholder="Select Role"
              value={form.role}
              onPress={() => console.log('Select Role')}
            />

            <CustomSelect
              label="Region"
              placeholder="Select Region"
              value={form.region}
              onPress={() => console.log('Select Region')}
            />

            <CustomInput
              label="Create Password"
              placeholder="••••••••"
              value={form.password}
              onChangeText={(val) => updateForm('password', val)}
              secureTextEntry={true}
            />

            <CustomInput
              label="Confirm Password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChangeText={(val) => updateForm('confirmPassword', val)}
              secureTextEntry={true}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Create Account"
                onPress={() => console.log('Creating account...', form)}
              />
              <Text style={styles.termsText}>
                By creating an account, you agree to Avante Medical's{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#24458B',
    paddingBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },
  introSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    fontWeight: '400',
  },
  form: {
    width: '100%',
  },
  selectContainer: {
    marginBottom: 20,
    width: '100%',
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  selectBox: {
    height: 55,
    borderWidth: 1,
    borderColor: '#A8C9F8',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectValue: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#24458B',
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});
