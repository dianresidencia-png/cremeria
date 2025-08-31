import CremeriaHeader from "@/app/(routes)/nosotros/components/headertop"
import HistoriaCremeria from "@/app/(routes)/nosotros/components/Historia"
import Mision from "@/app/(routes)/nosotros/components/misionVision"
import Estadistica from "@/app/(routes)/nosotros/components/estadistica"
import { Shield, Award, Users, Heart, CheckCircle, Droplets } from 'lucide-react';



export default function Page() {
    return(
        <div className="max-w-6xl mx-auto px-6 py-12">
            <CremeriaHeader />
            <HistoriaCremeria />
            <Estadistica />
            <Mision />
            

        </div>
    )
}