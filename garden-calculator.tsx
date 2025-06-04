"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, MessageCircle } from "lucide-react"

const plantData = [
	{
		category: "Sam's Shop",
		plants: [
			{ name: "Carrot", value: 18 },
			{ name: "Strawberry", value: 14 },
			{ name: "Blueberry", value: 18 },
			{ name: "Orange Tulip", value: 767 },
			{ name: "Tomato", value: 27 },
			{ name: "Corn", value: 36 },
			{ name: "Daffodil", value: 903 },
			{ name: "Watermelon", value: 2708 },
			{ name: "Pumpkin", value: 3700 },
			{ name: "Apple", value: 248 },
			{ name: "Bamboo", value: 3610 },
			{ name: "Coconut", value: 361 },
			{ name: "Cactus", value: 3068 },
			{ name: "Dragon Fruit", value: 4287 },
			{ name: "Mango", value: 5866 },
			{ name: "Grape", value: 7085 },
			{ name: "Mushroom", value: 136278 },
			{ name: "Pepper", value: 7220 },
			{ name: "Cacao", value: 9928 },
			{ name: "Beanstalk", value: 18050 },
		],
	},
	{
		category: "Normal Seed Pack",
		plants: [
			{ name: "Pear", value: 500 },
			{ name: "Raspberry", value: 90 },
			{ name: "Pineapple", value: 1805 },
			{ name: "Peach", value: 271 },
		],
	},
	{
		category: "Exotic Seed Pack",
		plants: [
			{ name: "Papaya", value: 1000 },
			{ name: "Banana", value: 1579 },
			{ name: "Passionfruit", value: 3204 },
			{ name: "Soul Fruit", value: 3000 },
			{ name: "Cursed Fruit", value: 15000 },
		],
	},
	{
		category: "Easter 2025 Event",
		plants: [
			{ name: "Chocolate Carrot", value: 16500 },
			{ name: "Red Lollipop", value: 70000 },
			{ name: "Candy Sunflower", value: 145000 },
			{ name: "Easter Egg", value: 4513 },
			{ name: "Candy Blossom", value: 92567 },
		],
	},
	{
		category: "Angry Plant Event",
		plants: [
			{ name: "Cranberry", value: 1805 },
			{ name: "Durian", value: 4513 },
			{ name: "Eggplant", value: 6769 },
			{ name: "Venus Fly Trap", value: 17000 },
			{ name: "Lotus", value: 20000 },
		],
	},
	{
		category: "Lunar Glow Event",
		plants: [
			{ name: "Nightshade", value: 2000 },
			{ name: "Glowshroom", value: 175 },
			{ name: "Mint", value: 6434 },
			{ name: "Moonflower", value: 8500 },
			{ name: "Starfruit", value: 15538 },
			{ name: "Moonglow", value: 18000 },
			{ name: "Moon Blossom", value: 45125 },
		],
	},
	{
		category: "Blood Moon Shop",
		plants: [
			{ name: "Blood Banana", value: 5415 },
			{ name: "Moon Melon", value: 16245 },
		],
	},
	{
		category: "Bizzy Bee Event",
		plants: [
			{ name: "Rose", value: 4513 },
			{ name: "Foxglove", value: 18050 },
			{ name: "Lilac", value: 31588 },
			{ name: "Pink Lily", value: 58663 },
			{ name: "Purple Dahila", value: 67688 },
			{ name: "Nectarine", value: 35000 },
			{ name: "Hive Fruit", value: 6000 },
			{ name: "Sunflower", value: 200000 },
		],
	},
]

const environmentalMutations = [
	{ name: "Wet", emoji: "💧", bonus: 1, color: "text-blue-500 dark:text-blue-400", exclusive: ["Frozen", "Chilled"] },
	{ name: "Chilled", emoji: "❄️", bonus: 1, color: "text-blue-500 dark:text-blue-400", exclusive: ["Frozen", "Wet"] },
	{ name: "Frozen", emoji: "🧊", bonus: 9, color: "text-blue-600 dark:text-blue-300", exclusive: ["Wet", "Chilled"] },
	{ name: "Chocolate", emoji: "🍫", bonus: 1, color: "text-amber-800 dark:text-amber-600" },
	{ name: "Moonlit", emoji: "🌙", bonus: 1, color: "text-purple-600 dark:text-purple-400" },
	{ name: "Pollinated", emoji: "🐝", bonus: 2, color: "text-yellow-700 dark:text-yellow-500" },
	{ name: "Bloodlit", emoji: "🩸", bonus: 3, color: "text-red-700 dark:text-red-500" },
	{ name: "Plasma", emoji: "⚡", bonus: 4, color: "text-purple-700 dark:text-purple-400" },
	{ name: "Honey Glazed", emoji: "🍯", bonus: 4, color: "text-orange-600 dark:text-orange-400" },
	{ name: "Zombified", emoji: "🧟", bonus: 24, color: "text-green-700 dark:text-green-500" },
	{ name: "Twisted", emoji: "🌀", bonus: 29, color: "text-indigo-800 dark:text-indigo-400" },
	{ name: "Shocked", emoji: "⚡", bonus: 99, color: "text-yellow-600 dark:text-yellow-400" },
	{ name: "Celestial", emoji: "🌠", bonus: 119, color: "text-pink-600 dark:text-pink-400" },
	{ name: "Disco", emoji: "🌈", bonus: 124, color: "text-pink-600 dark:text-pink-400" },
	{ name: "Voidtouched", emoji: "🌌", bonus: 134, color: "text-purple-900 dark:text-purple-300" },
]

const modifiers = {
	frozen: 9,
	choc: 1,
	celestial: 119,
	shocked: 99,
	wet: 1,
	chilled: 1,
	moonlit: 1,
	bloodlit: 3,
	disco: 124,
	twisted: 29,
	zomb: 24,
	plasma: 4,
	voidtouched: 134,
	pollinated: 2,
	honeyglazed: 4,
} as const;

const fruitMultipliers = {
	gold: 20,
	rainbow: 50,
	none: 1,
} as const;

const plantBaseData = {
	easteregg: { weight: 2.85, threshold: 2.85, valueLow: 2256, multiplier: 277.5 },
	moonflower: { weight: 1.9, threshold: 1.9, valueLow: 8574, multiplier: 2381 },
	starfruit: { weight: 2.85, threshold: 2.85, valueLow: 13538, multiplier: 1666.6 },
	pepper: { weight: 4.75, threshold: 4.75, valueLow: 7200, multiplier: 320 },
	grape: { weight: 2.85, threshold: 2.85, valueLow: 7085, multiplier: 872 },
	nightshade: { weight: 0.48, threshold: 0.48, valueLow: 3159, multiplier: 13850 },
	mint: { weight: 0.95, threshold: 0.95, valueLow: 4738, multiplier: 5230 },
	glowshroom: { weight: 0.7, threshold: 0.7, valueLow: 271, multiplier: 532.5 },
	bloodbanana: { weight: 1.42, threshold: 1.42, valueLow: 5415, multiplier: 2670 },
	beanstalk: { weight: 9.5, threshold: 9.5, valueLow: 18050, multiplier: 200 },
	coconut: { weight: 13.31, threshold: 13.31, valueLow: 361, multiplier: 2.04 },
	candyblossom: { weight: 2.85, threshold: 2.85, valueLow: 90250, multiplier: 11111.111 },
	carrot: { weight: 0.24, threshold: 0.24, valueLow: 18, multiplier: 275 },
	strawberry: { weight: 0.29, threshold: 0.29, valueLow: 14, multiplier: 175 },
	blueberry: { weight: 0.17, threshold: 0.17, valueLow: 18, multiplier: 500 },
	orangetulip: { weight: 0.0499, threshold: 0.0499, valueLow: 767, multiplier: 300000 },
	tomato: { weight: 0.44, threshold: 0.44, valueLow: 27, multiplier: 120 },
	daffodil: { weight: 0.16, threshold: 0.16, valueLow: 903, multiplier: 25000 },
	watermelon: { weight: 7.3, threshold: 7.3, valueLow: 2708, multiplier: 61.25 },
	pumpkin: { weight: 6.9, threshold: 6.9, valueLow: 3069, multiplier: 64 },
	mushroom: { weight: 25.9, threshold: 25.9, valueLow: 136278, multiplier: 241.6 },
	bamboo: { weight: 3.8, threshold: 3.8, valueLow: 3610, multiplier: 250 },
	apple: { weight: 2.85, threshold: 2.85, valueLow: 248, multiplier: 30.53 },
	corn: { weight: 1.9, threshold: 1.9, valueLow: 36, multiplier: 10 },
	cactus: { weight: 6.65, threshold: 6.65, valueLow: 3069, multiplier: 69.4 },
	cranberry: { weight: 0.95, threshold: 0.95, valueLow: 1805, multiplier: 2000 },
	moonmelon: { weight: 7.6, threshold: 7.6, valueLow: 16245, multiplier: 281.2 },
	pear: { weight: 2.85, threshold: 2.85, valueLow: 451, multiplier: 55.5 },
	durian: { weight: 7.6, threshold: 7.6, valueLow: 4513, multiplier: 78.19 },
	peach: { weight: 1.9, threshold: 1.9, valueLow: 271, multiplier: 75 },
	cacao: { weight: 7.6, threshold: 7.6, valueLow: 9928, multiplier: 171.875 },
	moonglow: { weight: 6.65, threshold: 6.65, valueLow: 18050, multiplier: 408.45 },
	dragonfruit: { weight: 11.38, threshold: 11.38, valueLow: 4287, multiplier: 32.99 },
	mango: { weight: 14.28, threshold: 14.28, valueLow: 5866, multiplier: 28.89 },
	moonblossom: { weight: 2.85, threshold: 2.86, valueLow: 45125, multiplier: 5555.555 },
	raspberry: { weight: 0.71, threshold: 0.71, valueLow: 90, multiplier: 177.5 },
	eggplant: { weight: 4.75, threshold: 4.75, valueLow: 6769, multiplier: 300 },
	papaya: { weight: 2.86, threshold: 2.86, valueLow: 903, multiplier: 111.11 },
	celestiberry: { weight: 1.9, threshold: 1.9, valueLow: 7220, multiplier: 2000 },
	moonmango: { weight: 14.25, threshold: 14.25, valueLow: 45125, multiplier: 222.22 },
	banana: { weight: 1.425, threshold: 1.425, valueLow: 1579, multiplier: 777.77 },
	passionfruit: { weight: 2.867, threshold: 2.867, valueLow: 3204, multiplier: 395 },
	soulfruit: { weight: 23.75, threshold: 23.75, valueLow: 6994, multiplier: 12.4 },
	chocolatecarrot: { weight: 0.2616, threshold: 0.2616, valueLow: 9928, multiplier: 145096 },
	redlolipop: { weight: 3.7988, threshold: 3.7988, valueLow: 45125, multiplier: 3125 },
	candysunflower: { weight: 1.428, threshold: 1.428, valueLow: 72200, multiplier: 35413 },
	lotus: { weight: 18.99, threshold: 18.99, valueLow: 15343, multiplier: 42.5 },
	pineapple: { weight: 2.85, threshold: 2.85, valueLow: 1805, multiplier: 222.5 },
	hive: { weight: 7.614, threshold: 7.614, valueLow: 6318, multiplier: 109 },
	lilac: { weight: 2.846, threshold: 2.846, valueLow: 31588, multiplier: 3899 },
	rose: { weight: 0.95, threshold: 0.95, valueLow: 4513, multiplier: 5000 },
	foxglove: { weight: 1.9, threshold: 1.9, valueLow: 18050, multiplier: 5000 },
	purpledahlia: { weight: 11.4, threshold: 11.4, valueLow: 67688, multiplier: 522 },
	sunflower: { weight: 14.23, threshold: 14.23, valueLow: 135000, multiplier: 666.6 },
	pinklily: { weight: 5.699, threshold: 5.699, valueLow: 58663, multiplier: 1806.5 },
	nectarine: { weight: 2.807, threshold: 2.807, valueLow: 35000, multiplier: 4440 },
} as const;

type PlantName = keyof typeof plantBaseData;
type ModifierName = keyof typeof modifiers;
type FruitType = keyof typeof fruitMultipliers;

const plantNameMap: Record<string, PlantName> = {
	"Celestiberry": "celestiberry",
	"Moonmango": "moonmango",
	"Eggplant": "eggplant",
	"Bloodbanana": "bloodbanana",
	"Lotus": "lotus",
	"Carrot": "carrot",
	"Strawberry": "strawberry",
	"Blueberry": "blueberry",
	"Orange Tulip": "orangetulip",
	"Tomato": "tomato",
	"Corn": "corn",
	"Daffodil": "daffodil",
	"Watermelon": "watermelon",
	"Pumpkin": "pumpkin",
	"Apple": "apple",
	"Bamboo": "bamboo",
	"Coconut": "coconut",
	"Cactus": "cactus",
	"Dragon Fruit": "dragonfruit",
	"Mango": "mango",
	"Grape": "grape",
	"Mushroom": "mushroom",
	"Pepper": "pepper",
	"Cacao": "cacao",
	"Beanstalk": "beanstalk",
	"Pear": "pear",
	"Raspberry": "raspberry",
	"Pineapple": "pineapple",
	"Peach": "peach",
	"Papaya": "papaya",
	"Banana": "banana",
	"Passionfruit": "passionfruit",
	"Soul Fruit": "soulfruit",
	"Cursed Fruit": "durian",
	"Chocolate Carrot": "chocolatecarrot",
	"Red Lollipop": "redlolipop",
	"Candy Sunflower": "candysunflower",
	"Easter Egg": "easteregg",
	"Candy Blossom": "candyblossom",
	"Nightshade": "nightshade",
	"Glowshroom": "glowshroom",
	"Mint": "mint",
	"Moonflower": "moonflower",
	"Starfruit": "starfruit",
	"Moonglow": "moonglow",
	"Moon Blossom": "moonblossom",
	"Moon Melon": "moonmelon",
	"Foxglove": "foxglove",
	"Lilac": "lilac",
	"Pink Lily": "pinklily",
	"Purple Dahila": "purpledahlia",
	"Hive Fruit": "hive",
	"Sunflower": "sunflower",
	"Nectarine": "nectarine",
};

const envMutationToModifier: Record<string, ModifierName> = {
	"Wet": "wet",
	"Chilled": "chilled",
	"Frozen": "frozen",
	"Chocolate": "choc",
	"Moonlit": "moonlit",
	"Pollinated": "pollinated",
	"Bloodlit": "bloodlit",
	"Plasma": "plasma",
	"Honey Glazed": "honeyglazed",
	"Zombified": "zomb",
	"Twisted": "twisted",
	"Shocked": "shocked",
	"Celestial": "celestial",
	"Disco": "disco",
	"Voidtouched": "voidtouched",
};

const coreMutationToFruit: Record<string, FruitType> = {
	"1": "none",
	"20": "gold",
	"50": "rainbow",
};

function calculatePlantValue(
	plant: PlantName,
	weight: number,
	modifiersList: ModifierName[],
	fruit: FruitType
): number {
	const plantData = plantBaseData[plant]
	if (!plantData) return 0
	const useValueLow = weight <= plantData.threshold
	const baseValue = useValueLow
		? plantData.valueLow
		: plantData.multiplier * Math.pow(weight, 2)
	const modSum = modifiersList.reduce((sum, mod) => sum + (modifiers[mod] || 0), 0)
	const modifierFactor = 1 + modSum
	const fruitFactor = fruitMultipliers[fruit] || 1
	const finalValue = Math.ceil(baseValue * fruitFactor * modifierFactor)
	return finalValue
}

function getFinalValueFromUI(
	selectedPlant: { name: string; value: number } | null,
	customValue: string,
	weight: string,
	envMutations: string[],
	coreMutation: string
) {
	if (!selectedPlant || selectedPlant.name === "Custom Value") {
		return Math.round(Number(customValue) || 0)
	}
	const plantKey = plantNameMap[selectedPlant.name]
	if (!plantKey) return 0
	const weightNum = Number.parseFloat(weight) || 0
	const activeModifiers = envMutations.map((m: string) => envMutationToModifier[m]).filter(Boolean) as ModifierName[]
	const fruit = coreMutationToFruit[coreMutation] || "none"
	return calculatePlantValue(plantKey, weightNum, activeModifiers, fruit)
}

export default function GardenCalculator() {
	const [selectedPlant, setSelectedPlant] = useState<{ name: string; value: number } | null>(null)
	const [customValue, setCustomValue] = useState<string>("")
	const [weight, setWeight] = useState<string>("1")
	const [coreMutation, setCoreMutation] = useState<string>("1")
	const [envMutations, setEnvMutations] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [showDropdown, setShowDropdown] = useState(false)
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [isThemeChanging, setIsThemeChanging] = useState(false)
	const [themeRipple, setThemeRipple] = useState<{ x: number; y: number } | null>(null)

	useEffect(() => {
		setMounted(true)
	}, [])

	const allPlants = useMemo(() => {
		const plants = plantData.flatMap((category) =>
			category.plants.map((plant) => ({
				...plant,
				category: category.category,
			})),
		)
		plants.push({ name: "Custom Value", value: 0, category: "Custom" })
		return plants
	}, [])

	const filteredPlants = useMemo(() => {
		if (!searchTerm) return allPlants
		return allPlants.filter(
			(plant) =>
				plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				plant.category.toLowerCase().includes(searchTerm.toLowerCase()),
		)
	}, [searchTerm, allPlants])

	const handlePlantSelect = (plant: { name: string; value: number; category: string }) => {
		if (plant.name === "Custom Value") {
			setSelectedPlant({ name: "Custom Value", value: 0 })
			setCustomValue("")
			setWeight("1")
		} else {
			setSelectedPlant({ name: plant.name, value: plant.value })
			setCustomValue("")

			const plantKey = plantNameMap[plant.name]
			if (plantKey && plantBaseData[plantKey]) {
				setWeight(plantBaseData[plantKey].weight.toString())
			} else {
				setWeight("1")
			}
		}
		setSearchTerm(plant.name === "Custom Value" ? "" : plant.name)
		setShowDropdown(false)
	}
	const GitHubButton = () => {
		if (!mounted) return null

		return (
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => window.open("https://discord.gg/GmdrRxhCzv", "_blank")}
					className="rounded-2xl h-10 w-10 p-0 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-all duration-300"
					title="Contact me if you want to add more plants or features!"
				>
					<MessageCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
				</Button>
			</motion.div>
		)
	}

	const handleThemeChange = (newTheme: string, event: React.MouseEvent) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		setThemeRipple({ x, y })
		setIsThemeChanging(true)
		setTheme(newTheme)

		setTimeout(() => {
			setThemeRipple(null)
			setIsThemeChanging(false)
		}, 1000)
	}

	const handleEnvMutationChange = (mutationName: string, checked: boolean) => {
		const mutation = environmentalMutations.find((m) => m.name === mutationName)
		if (!mutation) return

		let newMutations = [...envMutations]

		if (checked) {

			if (mutation.exclusive) {
				newMutations = newMutations.filter((m) => !mutation.exclusive!.includes(m))
			}

			newMutations = newMutations.filter((m) => {
				const existingMutation = environmentalMutations.find((em) => em.name === m)
				return !existingMutation?.exclusive?.includes(mutationName)
			})
			newMutations.push(mutationName)
		} else {
			newMutations = newMutations.filter((m) => m !== mutationName)
		}

		setEnvMutations(newMutations)
	}

	const getBaseValue = () => {
		if (selectedPlant?.name === "Custom Value") {
			return Number.parseFloat(customValue) || 0
		}
		const plantKey = plantNameMap[selectedPlant?.name || ""]
		if (!plantKey) return 0
		const weightNum = Number.parseFloat(weight) || 0
		return calculatePlantValue(plantKey, weightNum, [], "none")
	}

	const ThemeToggle = () => {
		if (!mounted) return null

		return (
			<div className="relative">
				<motion.div
					className="flex items-center gap-2 p-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30 relative overflow-hidden"
					animate={isThemeChanging ? { scale: [1, 1.05, 1] } : {}}
					transition={{ duration: 0.3 }}
				>
					{/* Ripple effect */}
					<AnimatePresence>
						{themeRipple && (
							<motion.div
								className="absolute inset-0 rounded-2xl"
								style={
									{
										background:
											theme === "dark"
												? "radial-gradient(circle at var(--x) var(--y), rgba(55, 65, 81, 0.8) 0%, transparent 70%)"
												: "radial-gradient(circle at var(--x) var(--y), rgba(229, 231, 235, 0.8) 0%, transparent 70%)",
										"--x": `${themeRipple.x}px`,
										"--y": `${themeRipple.y}px`,
									} as React.CSSProperties
								}
								initial={{ scale: 0, opacity: 1 }}
								animate={{ scale: 4, opacity: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							/>
						)}
					</AnimatePresence>

					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Button
							variant={theme === "light" ? "default" : "ghost"}
							size="sm"
							onClick={(e) => handleThemeChange("light", e)}
							className="rounded-xl h-8 w-8 p-0 transition-all duration-300 relative z-10"
						>
							<motion.div
								animate={theme === "light" && isThemeChanging ? { rotate: 360 } : {}}
								transition={{ duration: 0.5 }}
							>
								<Sun className="h-4 w-4" />
							</motion.div>
						</Button>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Button
							variant={theme === "system" ? "default" : "ghost"}
							size="sm"
							onClick={(e) => handleThemeChange("system", e)}
							className="rounded-xl h-8 w-8 p-0 transition-all duration-300 relative z-10"
						>
							<Monitor className="h-4 w-4" />
						</Button>
					</motion.div>

					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<Button
							variant={theme === "dark" ? "default" : "ghost"}
							size="sm"
							onClick={(e) => handleThemeChange("dark", e)}
							className="rounded-xl h-8 w-8 p-0 transition-all duration-300 relative z-10"
						>
							<motion.div
								animate={theme === "dark" && isThemeChanging ? { rotate: -360 } : {}}
								transition={{ duration: 0.5 }}
							>
								<Moon className="h-4 w-4" />
							</motion.div>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		)
	}

	return (
		<motion.div
			className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-6 transition-all duration-700"
			animate={
				isThemeChanging
					? {
						filter: ["brightness(1)", "brightness(0.8)", "brightness(1)"],
						scale: [1, 0.98, 1],
					}
					: {}
			}
		>
			<div className="max-w-7xl mx-auto">
				{/* Theme Toggle */}
				<div className="flex justify-end items-center gap-3 mb-4">
					<GitHubButton />
					<ThemeToggle />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
					{/* Side Panel - Only Information */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<Card className="lg:col-span-1 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-green-200/50 dark:border-gray-600/30 text-gray-800 dark:text-gray-100 shadow-xl rounded-3xl overflow-hidden">
							<CardHeader className="pb-2">
								<CardTitle className="text-green-800 dark:text-gray-200 text-lg sm:text-xl font-medium">
									🌱 Mutation Guide
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 text-sm">
								<div>
									<h4 className="font-semibold text-green-800 dark:text-gray-200 mb-2">Core Mutations:</h4>
									<ul className="space-y-2 text-xs sm:text-sm">
										<li className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
											<span className="text-lg">🌑</span> <strong>None:</strong> Normal growth (×1)
										</li>
										<li className="text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
											<span className="text-lg">✨</span> <strong>Golden:</strong> Multiplies base value by 20×
										</li>
										<li className="flex items-center gap-2">
											<span className="text-lg">🌈</span>
											<strong className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
												Rainbow
											</strong>
											: Multiplies base value by 50×
										</li>
									</ul>
								</div>

								<Separator className="bg-green-300/50 dark:bg-gray-600/50" />

								<div>
									<h4 className="font-semibold text-green-800 dark:text-gray-200 mb-2">Environmental Mutations:</h4>
									<p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Stack-bonus = original multiplier − 1</p>
									<div className="grid grid-cols-1 gap-2 text-xs">
										{environmentalMutations.map((mutation) => (
											<div key={mutation.name} className={`${mutation.color} flex justify-between items-center`}>
												<span className="flex items-center gap-2">
													<span className="text-lg">{mutation.emoji}</span> {mutation.name}
												</span>
												<span className="font-semibold">+{mutation.bonus}</span>
											</div>
										))}
									</div>
									<p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
										Note: "Frozen" cannot stack with "Wet" or "Chilled."
									</p>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Main Calculator */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="lg:col-span-2"
					>
						<Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border-green-200/50 dark:border-gray-600/30 shadow-xl rounded-3xl overflow-hidden">
							<CardHeader className="pb-2">
								<CardTitle className="text-green-800 dark:text-gray-200 text-xl sm:text-2xl text-center font-medium">
									🌿 Grow a Garden Mutation Calculator
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Plant Selection */}
								<div className="space-y-2">
									<Label className="text-gray-800 dark:text-gray-200 font-medium text-base">🌾 Select Plant:</Label>
									<div className="relative">
										<Input
											placeholder="Search plants..."
											value={searchTerm}
											onChange={e => {
												setSearchTerm(e.target.value)
												setShowDropdown(true)
											}}
											onFocus={() => setShowDropdown(true)}
											className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-green-300/50 dark:border-gray-600/50 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-2xl h-12 px-4 pr-12 transition-all duration-300"
											autoComplete="off"
										/>
										{searchTerm && (
											<button
												type="button"
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
												onClick={() => {
													setSearchTerm("")
													setShowDropdown(true)
												}}
												aria-label="Clear search"
											>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										)}
										{showDropdown && (
											<>
												<div
													className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-green-300 dark:border-gray-600 rounded-2xl shadow-lg max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent"
													tabIndex={0}
												>
													{filteredPlants.length > 0 ? (
														filteredPlants.map((plant, index) => (
															<button
																key={`${plant.name}-${index}`}
																type="button"
																onClick={() => {
																	handlePlantSelect(plant)
																	setShowDropdown(false)
																}}
																className={`w-full text-left px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 border-b border-green-200 dark:border-gray-700 last:border-b-0 focus:bg-green-200 dark:focus:bg-gray-600 outline-none${selectedPlant?.name === plant.name ? ' bg-green-50 dark:bg-gray-700' : ''}`}
															>
																<div className="flex justify-between items-center">
																	<span className="font-medium">{plant.name}</span>
																	{plant.name !== "Custom Value" && (
																		<span className="text-sm text-gray-600 dark:text-gray-400">
																			${plant.value.toLocaleString()}
																		</span>
																	)}
																</div>
																<div className="text-xs text-gray-500 dark:text-gray-400">{plant.category}</div>
															</button>
														))
													) : (
														<div className="px-4 py-3 text-gray-500 dark:text-gray-400">No plants found</div>
													)}
												</div>
												<div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
											</>
										)}
									</div>
								</div>

								{/* Custom Value Input */}
								<AnimatePresence>
									{selectedPlant?.name === "Custom Value" && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											className="space-y-2"
										>
											<Label className="text-gray-800 dark:text-gray-200 font-medium text-base">
												💰 Custom Base Value:
											</Label>
											<motion.div
												whileFocus={{ scale: 1.02 }}
												transition={{ type: "spring", stiffness: 300, damping: 20 }}
											>
												<Input
													type="number"
													value={customValue}
													onChange={(e) => setCustomValue(e.target.value)}
													placeholder="Enter custom value..."
													className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-green-300/50 dark:border-gray-600/50 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-2xl h-12 px-4 transition-all duration-300"
												/>
											</motion.div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Weight Input */}
								<div className="space-y-2">
									<Label className="text-gray-800 dark:text-gray-200 font-medium text-base">⚖️ Weight (kg):</Label>
									<motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
										<Input
											type="number"
											value={weight}
											onChange={(e) => setWeight(e.target.value)}
											step="0.01"
											min="0"
											className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-green-300/50 dark:border-gray-600/50 text-gray-800 dark:text-gray-100 rounded-2xl h-12 px-4 transition-all duration-300"
										/>
									</motion.div>
								</div>

								{/* Core Mutations */}
								<div className="space-y-3">
									<Label className="text-gray-800 dark:text-gray-200 font-medium text-base">🌟 Core Mutation:</Label>
									<RadioGroup value={coreMutation} onValueChange={setCoreMutation} className="space-y-0">
										<div className="flex flex-col sm:flex-row gap-3">
											<motion.div
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.98 }}
												transition={{ type: "spring", stiffness: 400, damping: 17 }}
												className={`flex-1 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-green-300/50 dark:border-gray-600/50 rounded-2xl p-3 cursor-pointer transition-all duration-300 ${coreMutation === "1" ? "ring-2 ring-green-500/50 bg-green-100/50 dark:bg-gray-600/70 shadow-lg" : "hover:shadow-md"}`}
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													setCoreMutation("1")
												}}
											>
												<div className="flex items-center gap-3 pointer-events-none">
													<div className="pointer-events-auto">
														<RadioGroupItem value="1" id="none" className="border-green-500 text-green-500" />
													</div>
													<Label
														htmlFor="none"
														className="text-gray-600 dark:text-gray-400 cursor-pointer flex items-center gap-2 font-medium pointer-events-none"
													>
														<span className="text-lg">🌑</span> None (×1)
													</Label>
												</div>
											</motion.div>

											<motion.div
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.98 }}
												transition={{ type: "spring", stiffness: 400, damping: 17 }}
												className={`flex-1 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-green-300/50 dark:border-gray-600/50 rounded-2xl p-3 cursor-pointer transition-all duration-300 ${coreMutation === "20" ? "ring-2 ring-green-500/50 bg-green-100/50 dark:bg-gray-600/70 shadow-lg" : "hover:shadow-md"}`}
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													setCoreMutation("20")
												}}
											>
												<div className="flex items-center gap-3 pointer-events-none">
													<div className="pointer-events-auto">
														<RadioGroupItem value="20" id="golden" className="border-green-500 text-green-500" />
													</div>
													<Label
														htmlFor="golden"
														className="text-yellow-600 dark:text-yellow-400 cursor-pointer flex items-center gap-2 font-medium pointer-events-none"
													>
														<span className="text-lg">✨</span> Golden (×20)
													</Label>
												</div>
											</motion.div>

											<motion.div
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.98 }}
												transition={{ type: "spring", stiffness: 400, damping: 17 }}
												className={`flex-1 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-green-300/50 dark:border-gray-600/50 rounded-2xl p-3 cursor-pointer transition-all duration-300 ${coreMutation === "50" ? "ring-2 ring-green-500/50 bg-green-100/50 dark:bg-gray-600/70 shadow-lg" : "hover:shadow-md"}`}
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													setCoreMutation("50")
												}}
											>
												<div className="flex items-center gap-3 pointer-events-none">
													<div className="pointer-events-auto">
														<RadioGroupItem value="50" id="rainbow" className="border-green-500 text-green-500" />
													</div>
													<Label
														htmlFor="rainbow"
														className="cursor-pointer flex items-center gap-2 font-medium pointer-events-none"
													>
														<span className="text-lg">🌈</span>
														<span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">
															Rainbow (×50)
														</span>
													</Label>
												</div>
											</motion.div>
										</div>
									</RadioGroup>
								</div>

								{/* Environmental Mutations */}
								<div className="space-y-3">
									<Label className="text-gray-800 dark:text-gray-200 font-medium text-base">
										🌿 Environmental Mutations:
									</Label>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
										{environmentalMutations.map((mutation, index) => (
											<motion.div
												key={mutation.name}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.05 }}
												whileHover={{ scale: 1.02, y: -2 }}
												whileTap={{ scale: 0.98 }}
												className={`bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-green-300/50 dark:border-gray-600/50 rounded-2xl p-3 cursor-pointer transition-all duration-300 ${envMutations.includes(mutation.name) ? "ring-2 ring-green-500/50 bg-green-100/50 dark:bg-gray-600/70 shadow-lg" : "hover:shadow-md"}`}
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													handleEnvMutationChange(mutation.name, !envMutations.includes(mutation.name))
												}}
											>
												<div className="flex items-center justify-between pointer-events-none">
													<div className="flex items-center gap-3">
														<div className="pointer-events-auto">
															<Checkbox
																id={mutation.name}
																checked={envMutations.includes(mutation.name)}
																onCheckedChange={(checked) => {
																	handleEnvMutationChange(mutation.name, checked as boolean)
																}}
																onClick={(e) => e.stopPropagation()}
																className="border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
															/>
														</div>
														<Label
															htmlFor={mutation.name}
															className={`${mutation.color} cursor-pointer text-sm flex items-center gap-2 font-medium pointer-events-none`}
														>
															<span className="text-lg">{mutation.emoji}</span> {mutation.name}
														</Label>
													</div>
													<span className={`${mutation.color} text-sm font-semibold`}>+{mutation.bonus}</span>
												</div>
											</motion.div>
										))}
									</div>
								</div>

								{/* Results */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									key={getFinalValueFromUI(selectedPlant, customValue, weight, envMutations, coreMutation).toString()}
								>
									<motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
										<Card className="bg-green-100/80 dark:bg-gray-700/80 backdrop-blur-xl border-green-300/50 dark:border-gray-600/50 rounded-3xl shadow-lg">
											<CardContent className="pt-6">
												<div className="space-y-3 text-gray-800 dark:text-gray-100">
													<motion.div
														className="flex justify-between items-center"
														whileHover={{ x: 4 }}
														transition={{ type: "spring", stiffness: 400, damping: 17 }}
													>
														<span className="flex items-center gap-2 font-medium">
															<span className="text-lg">🌾</span> Base Value:
														</span>
														<span className="font-mono text-lg font-semibold">${getBaseValue().toLocaleString()}</span>
													</motion.div>
													<motion.div
														className="flex justify-between items-center"
														whileHover={{ x: 4 }}
														transition={{ type: "spring", stiffness: 400, damping: 17 }}
													>
														<span className="flex items-center gap-2 font-medium">
															<span className="text-lg">🌿</span> Stack Bonus:
														</span>
														<span className="font-mono text-lg font-semibold">
															+
															{envMutations
																.reduce((sum, mutationName) => {
																	const mutation = environmentalMutations.find((m) => m.name === mutationName)
																	return sum + (mutation?.bonus || 0)
																}, 0)
																.toLocaleString()}
														</span>
													</motion.div>
													<motion.div
														className="flex justify-between items-center"
														whileHover={{ x: 4 }}
														transition={{ type: "spring", stiffness: 400, damping: 17 }}
													>
														<span className="flex items-center gap-2 font-medium">
															<span className="text-lg">⚖️</span> Weight (kg):
														</span>
														<span className="font-mono text-lg font-semibold">{Number.parseFloat(weight) || 0}</span>
													</motion.div>
													<Separator className="bg-green-400/50 dark:bg-gray-600/50 my-3" />
													<motion.div
														className="flex justify-between items-center text-lg font-bold text-green-800 dark:text-yellow-400"
														whileHover={{ scale: 1.02 }}
														transition={{ type: "spring", stiffness: 400, damping: 17 }}
													>
														<span className="flex items-center gap-2">
															<span className="text-xl">💰</span> Total Value:
														</span>
														<span className="font-mono text-xl">
															≈$
															{getFinalValueFromUI(selectedPlant, customValue, weight, envMutations, coreMutation).toLocaleString()}
														</span>
													</motion.div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>

			{/* Click outside to close dropdown */}
		</motion.div>
	)
}
