import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(4, 'Should be min of 4 characters').max(16, 'maximum 16 characters').required("Length is required")
})

export default function App() {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, useNumbers] = useState(false)
  const [symbols, useSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseChars = upperCaseChars.toLowerCase()

    const digitChars = '0123456789'
    const specialChars = '!@#$%^&8()-+'

    if (upperCase)
      characterList += upperCaseChars

    if (lowerCase)
      characterList += lowerCaseChars

    if (numbers)
      characterList += digitChars

    if (symbols)
      characterList += specialChars

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }

    return result;
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    useNumbers(false)
    useSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}></Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(Number(values.passwordLength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>

                  <TextInput style={styles.inputStyle} value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')} placeholder='Ex. 8'
                    keyboardType='numeric' />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>

                  <BouncyCheckbox isChecked={lowerCase}
                    onPress={() => setLowerCase(lowerCase => !lowerCase)}
                    fillColor='#29AB87' />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include uppercase</Text>

                  <BouncyCheckbox isChecked={upperCase}
                    onPress={() => setUpperCase(upperCase => !upperCase)}
                    fillColor='#29AB87' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include numbers</Text>

                  <BouncyCheckbox isChecked={numbers}
                    onPress={() => useNumbers(numbers => !numbers)}
                    fillColor='#29AB87' />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include special characters</Text>

                  <BouncyCheckbox isChecked={symbols}
                    onPress={() => useSymbols(symbols => !symbols)}
                    fillColor='#29AB87' />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} 
                  onPress={() => handleSubmit()} >
                    <Text>Generate password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.secondaryBtn} 
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        {
          isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>test</Text>
              <Text style={styles.description}>Long press to copy</Text>
              <Text style={styles.generatedPassword} selectable={true}>{password}</Text>
            </View>
          ) : null
        }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
})