import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux/configureStore'
import { setLanguage } from 'src/redux/language/languageSlice'
import { Select, MenuItem, SelectChangeEvent, FormControl, Box, Typography } from '@mui/material'
import EnFlag from '../assets/en-flag.png'
import VnFlag from '../assets/vi-flag.png'

const languages = [
  { code: 'vi', label: 'Tiếng Việt', icon: VnFlag },
  { code: 'en', label: 'English', icon: EnFlag }
]

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [currentLanguage, setCurrentLanguage] = useState<string>(localStorage.getItem('language') || 'vi')

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const selected = event.target.value
    setCurrentLanguage(selected)
    i18n.changeLanguage(selected)
    localStorage.setItem('language', selected)
    dispatch(setLanguage(selected))
  }

  return (
    <FormControl size='small' sx={{ minWidth: 150 }}>
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Language selector' }}
        renderValue={(value) => {
          const lang = languages.find((l) => l.code === value)
          return (
            <Box display='flex' alignItems='center'>
              <img
                src={lang?.icon}
                alt={lang?.code}
                width={20}
                height={20}
                style={{ marginRight: 8, borderRadius: 20 }}
              />
              <Typography>{lang?.label}</Typography>
            </Box>
          )
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box display='flex' alignItems='center'>
              <img
                src={lang.icon}
                alt={lang.code}
                width={20}
                height={20}
                style={{ marginRight: 8, borderRadius: 20 }}
              />
              <Typography>{lang.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSelector
