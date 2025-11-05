
import Image from 'next/image';
import dottedface from '@/media/dottedface.gif';

export default function DottedFace(props: any) {
    return (
    
        <div className="flex justify-center items-center">
           <Image 
                src={dottedface} 
                alt="завантаження..."
                width={350}
                height={350}
            />
        </div>
    );
}