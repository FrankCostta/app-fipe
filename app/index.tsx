import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
  const [selectedModel, setSelectedModel] = useState("");
  const [enableDropdownBrand, setEnableDropdownBrand] = useState(false);
  const [enableDropdownModel, setEnableDropdownModel] = useState(false);
  const [enableDropdownYear, setEnableDropdownYear] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  // Seleciona uma categoria de veículo
  // habilitando o dropdown de marcas
  // e desabilitando os dropdowns de modelos e anos
  // Se a categoria já estiver selecionada, não faz nada
  // Se a categoria for diferente da selecionada, carrega as marcas
  const onSelectedCategory = (id: string) => {
    if (selectedCategory !== id) {
      setSelectedCategory(id);
      loadBrands(id);
    }
  } 

  // Carrega as marcas de veículos de uma categoria selecionada
  // e habilita o dropdown de marcas
  async function loadBrands(category: string) {
      const response = await api.get(`/${category}/brands`);
      setBrands(response.data);
      setEnableDropdownBrand(true);
    setEnableDropdownModel(false);
    setEnableDropdownYear(false);
  }

  // Carrega os modelos de uma marca selecionada
  // e habilita o dropdown de modelos
  async function loadModels(brandId: string) {
    setSelectedBrand(brandId);
    const response = await api.get(`/${selectedCategory}/brands/${brandId}/models`);
    setModels(response.data);
    setEnableDropdownModel(true);
    setEnableDropdownYear(false);
  }

  // Carrega os anos de um modelo selecionado
  // e habilita o dropdown de anos
  async function loadYears(modelId: string) {
    setSelectedModel(modelId);
    const response = await api.get(`/${selectedCategory}/brands/${selectedBrand}/models/${modelId}/years`);
    setYears(response.data);
    setEnableDropdownYear(true);
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
          onCodeSelect={(code) => loadModels(code)}
        />

        <Text style={styles.separator}>|||</Text>

        <Dropdown
          options={models}
          enabled={enableDropdownModel}
          label="Selecione um modelo"
          onCodeSelect={(code) => loadYears(code)}
        />

        <Dropdown
          options={years}
          enabled={enableDropdownYear}
          label="Selecione o ano do veículo"
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
  separator: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(15 9 45)",
  }
});