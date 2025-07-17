



import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import api from "@/services/api";

import CategoryRadioButton from "@/components/CategoryRadioButton";
import Dropdown from "@/components/Dropdown";
import DropdownBrand from "@/components/DropdownBrand";
import Header from "@/components/Header";

export default function Index() {

  const categories = [
    {id: "motorcycles", label: "Motos"},
    {id: "cars", label: "Carros"},
    {id: "trucks", label: "Caminhão"},
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [enableDropdownBrand, setEnableDropdownBrand] = useState(false);
  const [enableDropdownModel, setEnableDropdownModel] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);


  const onSelectedCategory = (id: string) => {
    if (selectedCategory !== id) {
      setSelectedCategory(id);
      loadBrands(id);
      setEnableDropdownModel(false);
    }
  }

  async function loadBrands(category: string) {
      const response = await api.get(`/${category}/brands`);
      setBrands(response.data);
      setEnableDropdownBrand(true);
  }
  async function loadModels(category: string, brandId: string) {
    const response = await api.get(`/${category}/brands/${brandId}/models`);
    setModels(response.data);
    setEnableDropdownModel(true);
  }
  async function loadYears(category: string, brandId: string, modelId: string) {
    const response = await api.get(`/${category}/brands/${brandId}/models/${modelId}years/`);
    setModels(response.data);
    setEnableDropdownModel(true);
  }

  return (
    <View>

      <Header /> {/* Logo fixada ao topo do app */}


      {/* Botões de categoria dos veículos */}

      <View style={styles.categoryBar}>
        {categories.map((category, index) => (
          <CategoryRadioButton 
            key={category.id}
            label={category.label}
            icon={index}
            onSelect={() => onSelectedCategory(category.id) }
            selected={selectedCategory === category.id}
          />
        ))}
      </View>
      
      <View style={styles.dropdownArea}>

        <DropdownBrand
          options={brands}
          enabled={enableDropdownBrand}
          label="Selecione uma marca"
          onSelect={(brandId: string) => {
            setSelectedBrand(brandId);
            loadModels(selectedCategory, brandId);
          }}
        />

        <Dropdown
          options={models}
          enabled={enableDropdownModel}
          label="Selecione um modelo"
          onSelect={(modelId: string) => {
            setSelectedYear(modelId);
            loadYears(selectedCategory, modelId);
          }}
        />

        <Dropdown
          options={models}
          enabled={enableDropdownModel}
          label="Selecione um modelo"
          onSelect={() => null}
        />

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdownArea: {
    height: 400,
    padding: 20,
  },
});
