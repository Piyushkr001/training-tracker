'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { WarpBackground } from '@/components/magicui/warp-background'

type TrainingCenter = {
  id: string
  name: string
  state: string
  district: string
  address: string
  programs: string[]
  contact: string
  mapUrl: string
}

const apiKey = 'AIzaSyAmE1J5QdZYP5MwRhr__P1FRq668PbIf0U'

const locations: Omit<TrainingCenter, 'mapUrl'>[] = [
  {
    id: 'up-jhansi-1',
    name: 'KGBV Bangra, Jhansi',
    state: 'Uttar Pradesh',
    district: 'Jhansi',
    address: 'Bangra, Jhansi, Uttar Pradesh, India',
    programs: ['Residential Education', 'Hostel Management'],
    contact: '123-456-7890'
  },
  {
    id: 'ap-visakhapatnam-1',
    name: 'KGBV Tajangi, Visakhapatnam',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    address: 'Tajangi, Visakhapatnam, Andhra Pradesh, India',
    programs: ['Residential Training', 'Vocational Skills'],
    contact: '098-765-4321'
  },
  {
    id: 'dl-central-1',
    name: 'KGBV Central Delhi',
    state: 'Delhi',
    district: 'Central Delhi',
    address: 'Central Delhi, Delhi, India',
    programs: ['Education Support', 'Basic Literacy'],
    contact: '111-222-3333'
  },
  {
    id: 'jk-srinagar-1',
    name: 'KGBV Srinagar',
    state: 'Jammu and Kashmir',
    district: 'Srinagar',
    address: 'Srinagar, Jammu and Kashmir, India',
    programs: ['Skill Development', 'Leadership Training'],
    contact: '444-555-6666'
  },
  {
    id: 'mh-pune-1',
    name: 'KGBV Pune',
    state: 'Maharashtra',
    district: 'Pune',
    address: 'Pune, Maharashtra, India',
    programs: ['STEM Education', 'Health Awareness'],
    contact: '888-999-0001'
  },
  {
    id: 'ka-bangalore-1',
    name: 'KGBV Bangalore',
    state: 'Karnataka',
    district: 'Bangalore',
    address: 'Bangalore, Karnataka, India',
    programs: ['Digital Literacy', 'Women Empowerment'],
    contact: '777-666-5555'
  },
  {
    id: 'kl-kochi-1',
    name: 'KGBV Kochi',
    state: 'Kerala',
    district: 'Ernakulam',
    address: 'Kochi, Kerala, India',
    programs: ['Environmental Awareness', 'Skill Training'],
    contact: '112-233-4455'
  },
  {
    id: 'tn-chennai-1',
    name: 'KGBV Chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: 'Chennai, Tamil Nadu, India',
    programs: ['STEM, Language Learning'],
    contact: '987-654-3210'
  },
  {
    id: 'pb-amritsar-1',
    name: 'KGBV Amritsar',
    state: 'Punjab',
    district: 'Amritsar',
    address: 'Amritsar, Punjab, India',
    programs: ['Peace Education', 'History Awareness'],
    contact: '223-344-5566'
  },
  {
    id: 'rj-jaipur-1',
    name: 'KGBV Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    address: 'Jaipur, Rajasthan, India',
    programs: ['Art and Culture', 'Literacy'],
    contact: '445-667-8899'
  },
  {
    id: 'br-patna-1',
    name: 'KGBV Patna',
    state: 'Bihar',
    district: 'Patna',
    address: 'Patna, Bihar, India',
    programs: ['Basic Education', 'Health'],
    contact: '556-778-9911'
  },
  {
    id: 'cg-raipur-1',
    name: 'KGBV Raipur',
    state: 'Chhattisgarh',
    district: 'Raipur',
    address: 'Raipur, Chhattisgarh, India',
    programs: ['Tribal Education', 'Nutrition'],
    contact: '667-889-1122'
  },
  {
    id: 'ut-dehradun-1',
    name: 'KGBV Dehradun',
    state: 'Uttarakhand',
    district: 'Dehradun',
    address: 'Dehradun, Uttarakhand, India',
    programs: ['Forest Education', 'Sports'],
    contact: '778-990-1234'
  },
  {
    id: 'hp-shimla-1',
    name: 'KGBV Shimla',
    state: 'Himachal Pradesh',
    district: 'Shimla',
    address: 'Shimla, Himachal Pradesh, India',
    programs: ['Climate Education'],
    contact: '889-101-2345'
  },
  {
    id: 'ga-panaji-1',
    name: 'KGBV Panaji',
    state: 'Goa',
    district: 'North Goa',
    address: 'Panaji, Goa, India',
    programs: ['Tourism Studies'],
    contact: '990-212-3456'
  },
  {
    id: 'mz-aizawl-1',
    name: 'KGBV Aizawl',
    state: 'Mizoram',
    district: 'Aizawl',
    address: 'Aizawl, Mizoram, India',
    programs: ['Civic Education'],
    contact: '101-323-4567'
  },
  {
    id: 'sk-gangtok-1',
    name: 'KGBV Gangtok',
    state: 'Sikkim',
    district: 'East Sikkim',
    address: 'Gangtok, Sikkim, India',
    programs: ['Mountain Studies'],
    contact: '213-434-5678'
  },
  {
    id: 'ar-itanagar-1',
    name: 'KGBV Itanagar',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    address: 'Itanagar, Arunachal Pradesh, India',
    programs: ['Cultural Exchange'],
    contact: '324-545-6789'
  },
  {
    id: 'an-portblair-1',
    name: 'KGBV Port Blair',
    state: 'Andaman and Nicobar Islands',
    district: 'South Andaman',
    address: 'Port Blair, Andaman and Nicobar Islands, India',
    programs: ['Marine Studies'],
    contact: '435-656-7890'
  },
  {
    id: 'py-puducherry-1',
    name: 'KGBV Puducherry',
    state: 'Puducherry',
    district: 'Puducherry',
    address: 'Puducherry, Puducherry, India',
    programs: ['Multilingual Education'],
    contact: '546-767-8901'
  },
  {
    id: 'ld-kavaratti-1',
    name: 'KGBV Kavaratti',
    state: 'Lakshadweep',
    district: 'Lakshadweep',
    address: 'Kavaratti, Lakshadweep, India',
    programs: ['Island Ecology'],
    contact: '657-878-9012'
  },
  {
    id: 'ch-chandigarh-1',
    name: 'KGBV Chandigarh',
    state: 'Chandigarh',
    district: 'Chandigarh',
    address: 'Chandigarh, India',
    programs: ['Urban Education'],
    contact: '768-989-0123'
  },
  {
    id: 'nl-kohima-1',
    name: 'KGBV Kohima',
    state: 'Nagaland',
    district: 'Kohima',
    address: 'Kohima, Nagaland, India',
    programs: ['Cultural Studies'],
    contact: '879-090-1234'
  },
  {
    id: 'mn-imphal-1',
    name: 'KGBV Imphal',
    state: 'Manipur',
    district: 'Imphal West',
    address: 'Imphal, Manipur, India',
    programs: ['Peace & Conflict Studies'],
    contact: '980-101-2345'
  },
  {
    id: 'tr-agartala-1',
    name: 'KGBV Agartala',
    state: 'Tripura',
    district: 'West Tripura',
    address: 'Agartala, Tripura, India',
    programs: ['Health & Hygiene'],
    contact: '091-212-3456'
  },
  {
    id: 'as-guwahati-1',
    name: 'KGBV Guwahati',
    state: 'Assam',
    district: 'Kamrup',
    address: 'Guwahati, Assam, India',
    programs: ['River Ecology'],
    contact: '123-234-3456'
  },
  {
    id: 'jh-ranchi-1',
    name: 'KGBV Ranchi',
    state: 'Jharkhand',
    district: 'Ranchi',
    address: 'Ranchi, Jharkhand, India',
    programs: ['Tribal Welfare'],
    contact: '234-345-4567'
  },
  {
    id: 'or-bhubaneswar-1',
    name: 'KGBV Bhubaneswar',
    state: 'Odisha',
    district: 'Khurda',
    address: 'Bhubaneswar, Odisha, India',
    programs: ['Disaster Preparedness'],
    contact: '345-456-5678'
  },
  {
    id: 'tg-hyderabad-1',
    name: 'KGBV Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    address: 'Hyderabad, Telangana, India',
    programs: ['Digital Learning'],
    contact: '456-567-6789'
  }
]

const trainingCenters: TrainingCenter[] = locations.map((center) => ({
  ...center,
  mapUrl: `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(center.address)}&key=${apiKey}`
}))

export default function TrainingMapPage() {
  const [selectedCenter, setSelectedCenter] = useState<TrainingCenter>(trainingCenters[0])
  const mapRef = useRef<HTMLDivElement>(null)

  const handleChange = (value: string) => {
    const center = trainingCenters.find((c) => c.id === value)
    if (center) {
      setSelectedCenter(center)
      setTimeout(() => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <WarpBackground>
      <section className="min-h-screen p-4 md:p-8 flex flex-col gap-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Training Location Map
        </h1>

        <div className="max-w-md mx-auto w-full">
          <Label className="mb-3">Select Training Center</Label>
          <Select onValueChange={handleChange} defaultValue={selectedCenter.id}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a center" />
            </SelectTrigger>
            <SelectContent>
              {trainingCenters.map((center) => (
                <SelectItem key={center.id} value={center.id}>
                  {center.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col lg:flex-row gap-6" ref={mapRef}>
          <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden shadow-md">
            <iframe
              src={selectedCenter.mapUrl}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="h-[300px] lg:h-full w-full border-none"
            />
          </div>

          <Card className="flex-1 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{selectedCenter.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div><strong>Address:</strong> {selectedCenter.address}</div>
              <div><strong>Contact:</strong> {selectedCenter.contact}</div>
              <Separator />
              <div>
                <strong>Active Programs:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {selectedCenter.programs.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </WarpBackground>
  )
}
