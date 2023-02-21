<script>
</script>
<template>

  <v-card class="pa-2 my-4" >
    <v-card-title primary-title >
      <div>
        <v-row class="my-1">
          <v-col>
            <h3>
          headline 
        </h3>
        </v-col>
      <v-col cols="1">
            <v-menu location="end">
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>
        
              <v-list>
                <v-list-item>
                  <v-list-item-title class="text-h6 pa-1">Delete</v-list-item-title>
                  <v-list-item-title class="text-h6 pa-1">Edit</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          </v-row>
        
        
        <div class="text-truncate"
        style="max-width: 100%">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit placeat, ullam adipisci pariatur sapiente, velit fuga at quia quas exercitationem, itaque neque nam iusto fugit alias! Eum, voluptates non? Aliquid, provident pariatur non iste sapiente id suscipit ducimus sed, reiciendis molestiae exercitationem dolorem est, blanditiis corrupti natus asperiores aut ea nisi quaerat! Error distinctio labore totam suscipit quos! Velit ipsa maiores beatae dolorem incidunt molestias, officia recusandae totam possimus, officiis dicta a, reiciendis esse doloribus quis modi temporibus quod. Odit numquam temporibus sed ex necessitatibus soluta, officia molestias. Rerum repellendus quaerat aliquam ex, reiciendis corporis suscipit voluptate temporibus ipsum facilis neque alias quod doloribus expedita debitis in, sit consectetur. Ab earum atque mollitia nobis consequuntur optio doloremque possimus sit quae error quidem quam quos ex consectetur maxime, fuga iusto quas voluptatem omnis veritatis. Tempore fuga dicta accusamus autem quia, praesentium et quo perferendis officiis illo atque dolor ab ad eos libero veritatis distinctio harum commodi molestiae quos id? Laborum dolore soluta culpa! Aperiam pariatur porro possimus similique, nisi rem, corporis quam sapiente et animi, maxime ipsum facilis sed magnam voluptate odit natus laborum assumenda quas itaque quasi. Eum amet, dicta minima sint fuga distinctio tenetur beatae perspiciatis temporibus accusamus esse a harum unde corporis asperiores tempore facere provident officiis maiores tempora similique hic ad numquam porro. Obcaecati excepturi explicabo accusantium commodi hic fugit ex, quam fuga a optio doloremque dolor, recusandae, quisquam dolore numquam vitae nulla tenetur repellat. Vel, fugit! Facilis rerum suscipit nesciunt, dicta sit maiores? Dolore id harum vitae nostrum placeat dicta, blanditiis laborum ad facere numquam ducimus fugit facilis sit possimus cupiditate sunt aliquam qui neque! Minima praesentium in harum natus error ad doloribus pariatur, debitis consectetur accusamus voluptatem eos, rem adipisci nostrum sed vero, quibusdam rerum. Eveniet voluptatum iste commodi illum ipsam illo ullam unde dignissimos?  </div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>

        <v-list-item-title class="text-h6 my-1">Evan You</v-list-item-title>

        <v-list-item-subtitle class="text-h6">Vue Creator</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-btn><v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">256</span></v-btn>
            <span class="me-1">·</span>
          
           
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>