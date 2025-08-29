import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import api from "@/services/api";

import CategoryRadioButton from "@/components/CategoryRadioButton";
import ContentView from "@/components/ContentView";
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
  const [enableContentView, setEnableContentView] = useState(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setBrands([]);
    setModels([]);
    setYears([]);
    setInfo([]);
    setSelectedBrand("");
    setSelectedModel("");
    setEnableDropdownBrand(false);
    setEnableDropdownModel(false);
    setEnableDropdownYear(false);
    setEnableContentView(false);
}, [selectedCategory]);

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
    setEnableContentView(false);
  }

  // Carrega os modelos de uma marca selecionada
  // e habilita o dropdown de modelos
  async function loadModels(brandId: string) {
    setSelectedBrand(brandId);
    const response = await api.get(`/${selectedCategory}/brands/${brandId}/models`);
    setModels(response.data);
    setEnableDropdownModel(true);
    setEnableDropdownYear(false);
    setEnableContentView(false);
  }

  // Carrega os anos de um modelo selecionado
  // e habilita o dropdown de anos
  async function loadYears(modelId: string) {
    setSelectedModel(modelId);
    const response = await api.get(`/${selectedCategory}/brands/${selectedBrand}/models/${modelId}/years`);
    setYears(response.data);
    setEnableDropdownYear(true);
    setEnableContentView(false);
  }
  
  // Carrega os dados do ano do modelo especificado
  // e habilita o ContentView
  async function loadInfo(yearId: string) {
    const response = await api.get(`/${selectedCategory}/brands/${selectedBrand}/models/${selectedModel}/years/${yearId}`);
    setInfo(response.data);
    setEnableContentView(true);
    
  }
  
  return (
    <View style={styles.container}>
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
		
		{/* Dropown de seleção da marca do veiculo */}
        <DropdownBrand
          data={brands}
          enabled={enableDropdownBrand}
          label="Selecione uma marca"
          onCodeSelect={(code) => {
            setSelectedBrand(code); // Atualiza o estado
            loadModels(code)
          }}
        />

        <Text style={styles.separator}>|||</Text>
		
		{/* Dropdown de seleção do modelo do veiculo */}
        <Dropdown
          data={models}
          enabled={enableDropdownModel}
          label="Selecione um modelo"
          onCodeSelect={(code) => {
            setSelectedModel(code); // Atualiza o estado
            loadYears(code);
          }}
        />
		 
		{/* Dropdown de seleção do ano do veiculo */}
        <Dropdown
          data={years}
          enabled={enableDropdownYear}
          label="Selecione o ano do veículo"
          onCodeSelect={(code) => loadInfo(code)}
        />
      </View>
      
      
      {/* Area de informações do veiculo */}
      <ContentView 
      	enabled={enableContentView}
	  	data={info} 
	  />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  categoryBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdownArea: {
    margin: 16,
  },
  separator: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f092d",
    textAlign: "center",
  }
});