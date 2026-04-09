import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { wp, hp, ms, fs } from '../../utils/responsive';
import { AppColors } from '../../constants/Theme';

export default function ChangePasswordScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + hp(5) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={ms(22)} color={AppColors.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile.change_password')}</Text>
        <View style={{ width: wp(40) }} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('profile.current_password')}</Text>
          <TextInput style={styles.fieldInput} placeholder={t('profile.current_password')} placeholderTextColor={AppColors.placeholder} value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={true} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('profile.new_password')}</Text>
          <TextInput style={styles.fieldInput} placeholder={t('profile.new_password')} placeholderTextColor={AppColors.placeholder} value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('common.confirm_password')}</Text>
          <TextInput style={styles.fieldInput} placeholder={t('common.confirm_password')} placeholderTextColor={AppColors.placeholder} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
        </View>
        <TouchableOpacity style={styles.updateBtn} onPress={() => router.back()}>
          <Text style={styles.updateBtnText}>{t('common.update')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.backgroundLight },
  header: { backgroundColor: AppColors.primary, paddingBottom: hp(14), flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(15) },
  backBtn: { width: wp(40), height: wp(40), borderRadius: wp(20), backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', color: AppColors.textWhite, fontSize: fs(18), fontWeight: '700' },
  content: { padding: wp(20), paddingBottom: hp(40) },
  fieldContainer: { marginBottom: hp(20) },
  fieldLabel: { fontSize: fs(13), fontWeight: '600', color: AppColors.textSecondary, marginBottom: hp(8) },
  fieldInput: { height: hp(52), backgroundColor: AppColors.backgroundWhite, borderRadius: ms(12), borderWidth: 1.5, borderColor: AppColors.border, paddingHorizontal: wp(16), fontSize: fs(14), color: AppColors.textDark, fontWeight: '500' },
  updateBtn: { height: hp(55), backgroundColor: AppColors.teal, borderRadius: ms(12), alignItems: 'center', justifyContent: 'center', marginTop: hp(15), elevation: 4, shadowColor: AppColors.teal, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  updateBtnText: { color: AppColors.textWhite, fontSize: fs(17), fontWeight: '700' },
});
